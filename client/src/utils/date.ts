export function getDate(timestamp: number) {
  const d = new Date(timestamp)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDay()

  return `${year}/${month}/${day}`
}
