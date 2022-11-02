export const assembleQuery = (obj: any): string => {
  return Object.entries(obj)
    .filter(([key, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}

export const generateRandomId = (index?: number) => {
  return `${Date.now()}-${Math.round(Math.random() * 1000)}-${index === undefined ? Math.round(Math.random() * 1000) : index}`
}
