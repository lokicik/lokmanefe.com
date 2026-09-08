// Only explicit ISO dates from frontmatter may describe a content update.
export function contentDate(value: unknown): string | undefined {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value.toISOString();
  }
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value)) {
    return undefined;
  }
  const calendarDate = new Date(`${value.slice(0, 10)}T00:00:00Z`);
  const date = new Date(value);
  if (Number.isNaN(date.getTime()) || calendarDate.toISOString().slice(0, 10) !== value.slice(0, 10)) {
    return undefined;
  }
  return value.length === 10 ? value : date.toISOString();
}
