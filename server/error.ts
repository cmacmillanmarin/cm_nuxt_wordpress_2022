export function handleError(err: any) {
  if (err.error_message) {
    const errors = Object.entries(err.errors || {})
      .map(([key, value]) => `${key} ${value}`)
      .join('. ')
    throw new Error(`${err.error_message} ${errors}`)
  }

  throw new Error(err.message)
}
