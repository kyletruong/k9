import { OG_COLORS } from './theme'

interface HomeOgImageProps {
  logoSrc: string
}

function HomeOgImage({ logoSrc }: HomeOgImageProps) {
  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: OG_COLORS.background,
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', marginRight: 60 }}>
        <img alt='logo' src={logoSrc} width={200} height={200} />
      </div>

      <div
        style={{
          backgroundColor: OG_COLORS.foreground,
          height: 160,
          width: 4,
        }}
      />

      <div style={{ display: 'flex', marginLeft: 80 }}>
        <span
          style={{
            color: OG_COLORS.foreground,
            fontSize: 140,
            letterSpacing: '-2px',
            lineHeight: 1,
          }}
        >
          k9.dev
        </span>
      </div>
    </div>
  )
}

interface BlogIndexOgImageProps {
  logoSrc: string
}

function BlogIndexOgImage({ logoSrc }: BlogIndexOgImageProps) {
  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: OG_COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 40,
        }}
      >
        <img alt='logo' src={logoSrc} width={80} height={80} />
        <span
          style={{
            color: OG_COLORS.muted,
            fontSize: 40,
            letterSpacing: '-1px',
            lineHeight: 1,
            marginLeft: 24,
          }}
        >
          k9.dev
        </span>
      </div>

      <span
        style={{
          color: OG_COLORS.foreground,
          fontSize: 120,
          letterSpacing: '-2px',
          lineHeight: 1,
        }}
      >
        blog
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
        backgroundColor: OG_COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        padding: 80,
        width: '100%',
      }}
    >
      <span
        style={{
          color: OG_COLORS.foreground,
          fontSize: 64,
          letterSpacing: '-2px',
          lineHeight: 1.2,
        }}
      >
        {title}
      </span>

      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            color: OG_COLORS.muted,
            fontSize: 32,
            lineHeight: 1,
          }}
        >
          {date}
        </span>

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <img alt='logo' src={logoSrc} width={48} height={48} />
          <span
            style={{
              color: OG_COLORS.muted,
              fontSize: 32,
              lineHeight: 1,
              marginLeft: 16,
            }}
          >
            k9.dev
          </span>
        </div>
      </div>
    </div>
  )
}

export { BlogIndexOgImage, BlogPostOgImage, HomeOgImage }
