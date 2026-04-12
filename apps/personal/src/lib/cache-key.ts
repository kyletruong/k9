function removeSearchParams(request: Request): string {
  const url = new URL(request.url)
  url.search = ''
  return url.toString()
}

export { removeSearchParams }
