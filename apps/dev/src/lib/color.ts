const clamp = (x: number) => Math.min(1, Math.max(0, x))

/**
 * Convert linear RGB to sRGB with gamma encoding
 */
const linearToSrgb = (c: number) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055

const toHex = (v: number) =>
  Math.round(clamp(v) * 255)
    .toString(16)
    .padStart(2, '0')

function oklchToHex(l: number, c: number, hDeg: number): string {
  const h = (hDeg * Math.PI) / 180

  // OKLCH polar to OKLab cartesian
  const a = Math.cos(h) * c
  const b = Math.sin(h) * c

  // OKLab to LMS (cube root domain)
  // https://bottosson.github.io/posts/oklab/
  let L = l + 0.3963377774 * a + 0.2158037573 * b
  let M = l - 0.1055613458 * a - 0.0638541728 * b
  let S = l - 0.0894841775 * a - 1.291485548 * b

  // LMS cube root to LMS
  L = L * L * L
  M = M * M * M
  S = S * S * S

  // LMS to linear RGB
  const rLin = +4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S
  const gLin = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S
  const bLin = -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S

  const r = linearToSrgb(Math.max(0, rLin))
  const g = linearToSrgb(Math.max(0, gLin))
  const bl = linearToSrgb(Math.max(0, bLin))

  return `#${toHex(r)}${toHex(g)}${toHex(bl)}`
}

export const cubeColors = {
  base: oklchToHex(0.77, 0.2, 131),
  hover: '#ff69b4',
}
