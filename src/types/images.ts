export type ResponsiveImage = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number | string;
  height?: number | string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync";
  fetchPriority?: "auto" | "high" | "low";
};

export type ResponsiveImageMap = Record<string, ResponsiveImage>;
