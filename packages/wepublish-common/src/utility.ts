export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-/g, '')
    .replace(/-$/g, '')
}

export function capitalizeFirst(str: string) {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1)
}
