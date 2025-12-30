import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function getContext() {
  const queryClient = new QueryClient()
  return {
    queryClient,
  }
}

function Provider({
  children,
  queryClient,
}: {
  children: React.ReactNode
  queryClient: QueryClient
}) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export { getContext, Provider }
