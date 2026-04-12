function formatLsDate(date: Date): string {
  const month = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' }).format(date)
  const day = date.getUTCDate().toString().padStart(2, '0')
  const year = date.getUTCFullYear()
  return `${month} ${day} ${year}`
}

export { formatLsDate }
