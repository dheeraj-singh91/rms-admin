export function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-');
}

export function truncate(value: string, length: number) {
  return value.length > length ? `${value.slice(0, length)}...` : value;
}
