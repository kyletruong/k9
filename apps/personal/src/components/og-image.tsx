const STYLE = {
  accent: '#85cc23',
  background: '#0c0a09',
  fontSize: {
    lg: 160,
    md: 96,
    sm: 32,
  },
  foreground: '#fafaf9',
  muted: '#948e89',
} as const

function AccentBar() {
  return (
    <div
      style={{
        backgroundColor: STYLE.accent,
        height: 6,
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
      }}
    />
  )
}

interface BrandingProps {
  logoSrc: string
  section?: string
}

function Branding({ logoSrc, section }: BrandingProps) {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        right: 48,
        top: 40,
      }}
    >
      <img alt='logo' src={logoSrc} width={40} height={40} />
      <span
        style={{
          color: STYLE.muted,
          fontSize: STYLE.fontSize.sm,
          lineHeight: 1,
          marginLeft: 14,
        }}
      >
        k9.dev
        {section ? '/' : ''}
      </span>
      {section ? (
        <span
          style={{
            color: STYLE.foreground,
            fontSize: STYLE.fontSize.sm,
            lineHeight: 1,
          }}
        >
          {section}
        </span>
      ) : null}
    </div>
  )
}

interface HomeOgImageProps {
  logoSrc: string
}

function HomeOgImage({ logoSrc }: HomeOgImageProps) {
  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: STYLE.background,
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
      }}
    >
      <AccentBar />

      <div style={{ display: 'flex', marginRight: 40 }}>
        <img alt='logo' src={logoSrc} width={200} height={200} />
      </div>

      <span
        style={{
          color: STYLE.foreground,
          fontSize: STYLE.fontSize.lg,
          letterSpacing: '-2px',
          lineHeight: 1,
        }}
      >
        k9.dev
      </span>
    </div>
  )
}

interface SectionOgImageProps {
  logoSrc: string
  title: string
}

function toTitleCase(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase())
}

function SectionOgImage({ logoSrc, title }: SectionOgImageProps) {
  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: STYLE.background,
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
      }}
    >
      <AccentBar />
      <Branding logoSrc={logoSrc} />

      <span
        style={{
          color: STYLE.foreground,
          fontSize: STYLE.fontSize.lg,
          letterSpacing: '-2px',
          lineHeight: 1,
        }}
      >
        {toTitleCase(title)}
      </span>
    </div>
  )
}

interface NotFoundOgImageProps {
  logoSrc: string
}

function NotFoundOgImage({ logoSrc }: NotFoundOgImageProps) {
  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: STYLE.background,
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
      }}
    >
      <AccentBar />
      <Branding logoSrc={logoSrc} />

      <span
        style={{
          color: STYLE.foreground,
          fontSize: STYLE.fontSize.lg,
          letterSpacing: '-2px',
          lineHeight: 1,
        }}
      >
        cd: ???
      </span>
    </div>
  )
}

interface BlogPostOgImageProps {
  date: string
  logoSrc: string
  title: string
}

function BlogPostOgImage({ date, logoSrc, title }: BlogPostOgImageProps) {
  return (
    <div
      style={{
        backgroundColor: STYLE.background,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        padding: 80,
        position: 'relative',
        width: '100%',
      }}
    >
      <AccentBar />
      <Branding logoSrc={logoSrc} section='blog' />

      <span
        style={{
          color: STYLE.foreground,
          fontSize: STYLE.fontSize.md,
          letterSpacing: '-2px',
          lineHeight: 1.2,
        }}
      >
        {title}
      </span>

      <div
        style={{
          bottom: 80,
          display: 'flex',
          flexDirection: 'column',
          left: 80,
          position: 'absolute',
          right: 80,
        }}
      >
        <div
          style={{
            backgroundColor: STYLE.muted,
            height: 2,
            opacity: 0.4,
            width: '100%',
          }}
        />
        <span
          style={{
            color: STYLE.muted,
            fontSize: STYLE.fontSize.sm,
            lineHeight: 1,
            marginTop: 24,
          }}
        >
          {date}
        </span>
      </div>
    </div>
  )
}

export { BlogPostOgImage, HomeOgImage, NotFoundOgImage, SectionOgImage }
