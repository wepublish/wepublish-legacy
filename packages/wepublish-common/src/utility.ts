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

export function shuffleArray<T>(array: T[]): T[] {
  const arrayCopy = array.concat()

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]
  }

  return arrayCopy
}
