export const formatMessageDate = (date?: Date | null) => {
  if (!date) return 'unknown';
  const today = new Date()
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000) // 1 day ago

  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')

  if (date.toDateString() === today.toDateString()) return `Today, ${hours}:${minutes}`
  if (date.toDateString() === yesterday.toDateString()) return `Yesterday, ${hours}:${minutes}`

  return date.toLocaleDateString('en-GB')
}

export const getTime = (date?: Date | null) => {
  if (!date) return 'unknown';
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}