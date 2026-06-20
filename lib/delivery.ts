export function getEstimatedDelivery() {
  const start = new Date()

  start.setDate(
    start.getDate() + 3
  )

  const end = new Date()

  end.setDate(
    end.getDate() + 6
  )

  const options:
    Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric'
    }

  return `${start.toLocaleDateString(
    'en-IN',
    options
  )} – ${end.toLocaleDateString(
    'en-IN',
    options
  )}`
}