import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { HalfFloatType, Vector2, WebGLRenderTarget } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const BLOOM = { radius: 0.8, strength: 2, threshold: 0 }
const WARP = { x: 0.0, y: 0.0 }

const CrtShader = {
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform vec2 iResolution;
    uniform vec2 warp;
    varying vec2 vUv;

    #define res (iResolution.xy / 6.0)

    float hardScan = -8.0;
    float hardPix = -3.0;
    float maskDark = 0.5;
    float maskLight = 1.5;

    vec3 Fetch(vec2 pos, vec2 off) {
      pos = floor(pos * res + off) / res;
      pos = clamp(pos, 0.001, 0.999);
      return texture2D(tDiffuse, pos.xy).rgb;
    }

    vec2 Dist(vec2 pos) {
      pos = pos * res;
      return -((pos - floor(pos)) - vec2(0.5));
    }

    float Gaus(float pos, float scale) {
      return exp2(scale * pos * pos);
    }

    vec3 Horz3(vec2 pos, float off) {
      vec3 b = Fetch(pos, vec2(-1.0, off));
      vec3 c = Fetch(pos, vec2(0.0, off));
      vec3 d = Fetch(pos, vec2(1.0, off));
      float dst = Dist(pos).x;
      float scale = hardPix;
      float wb = Gaus(dst - 1.0, scale);
      float wc = Gaus(dst + 0.0, scale);
      float wd = Gaus(dst + 1.0, scale);
      return (b * wb + c * wc + d * wd) / (wb + wc + wd);
    }

    float Scan(vec2 pos, float off) {
      float dst = Dist(pos).y;
      return Gaus(dst + off, hardScan);
    }

    vec3 Tri(vec2 pos) {
      vec3 a = Horz3(pos, -1.0);
      vec3 b = Horz3(pos, 0.0);
      vec3 c = Horz3(pos, 1.0);
      float wa = Scan(pos, -1.0);
      float wb = Scan(pos, 0.0);
      float wc = Scan(pos, 1.0);
      return a * wa + b * wb + c * wc;
    }

    vec2 Warp(vec2 pos) {
      if (warp.x == 0.0 && warp.y == 0.0) return pos;
      pos = pos * 2.0 - 1.0;
      pos *= vec2(1.0 + (pos.y * pos.y) * warp.x, 1.0 + (pos.x * pos.x) * warp.y);
      return pos * 0.5 + 0.5;
    }

    vec3 Mask(vec2 pos) {
      pos.x += pos.y * 3.0;
      vec3 mask = vec3(maskDark, maskDark, maskDark);
      pos.x = fract(pos.x / 6.0);
      if (pos.x < 0.333) mask.r = maskLight;
      else if (pos.x < 0.666) mask.g = maskLight;
      else mask.b = maskLight;
      return mask;
    }

    void main() {
      vec2 fragCoord = vUv * iResolution;
      vec2 pos = Warp(vUv);
      float srcAlpha = texture2D(tDiffuse, pos).a;
      vec3 linearColor = Tri(pos) * Mask(fragCoord);
      gl_FragColor = vec4(linearColor, srcAlpha);
    }
  `,
  uniforms: {
    iResolution: { value: new Vector2(1, 1) },
    tDiffuse: { value: null },
    warp: { value: new Vector2(WARP.x, WARP.y) },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
}

function CrtEffects() {
  const composerRef = useRef<EffectComposer | null>(null)
  const renderTargetRef = useRef<WebGLRenderTarget | null>(null)
  const crtPassRef = useRef<ShaderPass | null>(null)
  const bloomPassRef = useRef<UnrealBloomPass | null>(null)

  const { camera, gl, scene, size } = useThree()

  // oxlint-disable-next-line react-hooks/exhaustive-deps -- intentionally capture initial size only
  const initialSize = useMemo(() => ({ height: size.height, width: size.width }), [])

  useEffect(() => {
    gl.setClearColor(0x000000, 0)

    const renderTarget = new WebGLRenderTarget(initialSize.width, initialSize.height, {
      type: HalfFloatType,
    })
    renderTargetRef.current = renderTarget

    const composer = new EffectComposer(gl, renderTarget)

    composer.addPass(new RenderPass(scene, camera))

    const bloomPass = new UnrealBloomPass(
      new Vector2(initialSize.width, initialSize.height),
      BLOOM.strength,
      BLOOM.radius,
      BLOOM.threshold,
    )
    bloomPassRef.current = bloomPass
    composer.addPass(bloomPass)

    const crtPass = new ShaderPass(CrtShader)
    crtPass.uniforms.iResolution?.value.set(initialSize.width, initialSize.height)
    crtPassRef.current = crtPass
    composer.addPass(crtPass)

    composer.addPass(new OutputPass())

    composerRef.current = composer

    return () => {
      renderTarget.dispose()
      composer.dispose()
    }
  }, [gl, scene, camera, initialSize])

  useEffect(() => {
    const composer = composerRef.current
    const renderTarget = renderTargetRef.current
    if (!composer || !renderTarget) return

    composer.setSize(size.width, size.height)
    renderTarget.setSize(size.width, size.height)
    crtPassRef.current?.uniforms.iResolution?.value.set(size.width, size.height)
    bloomPassRef.current?.resolution.set(size.width, size.height)
  }, [size.width, size.height])

  useFrame(() => {
    composerRef.current?.render()
  }, 1)

  return null
}

export { CrtEffects }
