import { useNavigate } from '@tanstack/react-router'
import { AuthKitProvider } from '@workos-inc/authkit-react'

const VITE_WORKOS_CLIENT_ID = import.meta.env.VITE_WORKOS_CLIENT_ID
if (!VITE_WORKOS_CLIENT_ID) {
  throw new Error('Missing WORKOS_CLIENT_ID')
}

const VITE_WORKOS_API_HOSTNAME = import.meta.env.VITE_WORKOS_API_HOSTNAME
if (!VITE_WORKOS_API_HOSTNAME) {
  throw new Error('Missing WORKOS_API_HOSTNAME')
}

export default function AppWorkOSProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  return (
    <AuthKitProvider
      apiHostname={VITE_WORKOS_API_HOSTNAME}
      clientId={VITE_WORKOS_CLIENT_ID}
      onRedirectCallback={({ state }) => {
        if (state?.returnTo) {
          void navigate(state.returnTo)
        }
      }}
    >
      {children}
    </AuthKitProvider>
  )
}
