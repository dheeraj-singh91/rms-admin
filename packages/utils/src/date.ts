export function formatDate(value: string | Date) {
  return new Date(value).toISOString().slice(0, 10);
}

export function addDays(value: string | Date, days: number) {
  const date = new Date(value);
  date.setDate(date.getDate() + days);
  return date;
}
