export function formattedDate(d: Date): string {
  const year =
    ('0' + d.getUTCDate()).slice(-2) +
    '/' +
    ('0' + (d.getUTCMonth() + 1)).slice(-2) +
    '/' +
    d.getUTCFullYear()
  const hour = ('0' + d.getUTCHours()).slice(-2) + ':' + ('0' + d.getUTCMinutes()).slice(-2)
  return hour + ' ' + year
}
