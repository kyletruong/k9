function formatLsDate(date: Date): string {
  const month = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' }).format(date)
  const day = date.getUTCDate().toString().padStart(2, ' ')
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  return `${month} ${day} ${hours}:${minutes}`
}

export function getLsMetadata(date: Date = new Date()): string {
  return `-rw-r--r--  1 kyle  staff  0 ${formatLsDate(date)} `
}
