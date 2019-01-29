export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-/g, '')
    .replace(/-$/g, '')
}
