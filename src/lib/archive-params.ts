export type ArchiveSearchParams = Record<string, string | string[] | undefined>;

export function serializeSearchParams(values: ArchiveSearchParams) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    for (const entry of Array.isArray(value) ? value : value === undefined ? [] : [value]) {
      params.append(key, entry);
    }
  }
  return params.toString();
}
