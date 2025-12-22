export const slugify = (value: string): string =>
  value.toLowerCase().trim().replace(/\s+/g, "-").replace(/\./g, "");
