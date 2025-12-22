export const slugify = (value: string): string => {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return normalized
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};
