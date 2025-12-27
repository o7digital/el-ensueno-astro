import { getImage } from "astro:assets";
import type { ImageMetadata, ImageOutputFormat } from "astro";
import type { ResponsiveImage } from "@/types/images";

type ResponsiveImageOptions = {
  widths?: number[];
  sizes?: string;
  format?: ImageOutputFormat;
  priority?: boolean;
};

const imageModules = import.meta.glob("../assets/images/**/*.{avif,webp,jpg,jpeg,png}", {
  eager: true,
});

const imageMap = new Map<string, ImageMetadata>();

for (const [path, module] of Object.entries(imageModules)) {
  const image = (module as { default: ImageMetadata }).default;
  const normalized = path.replace("../assets/images", "/images");
  imageMap.set(normalized, image);
}

export const getImageMetadata = (path: string): ImageMetadata => {
  const image = imageMap.get(path);
  if (!image) {
    throw new Error(`Missing image for path: ${path}`);
  }
  return image;
};

export const getResponsiveImage = async (
  path: string,
  options: ResponsiveImageOptions = {},
): Promise<ResponsiveImage> => {
  const image = getImageMetadata(path);
  const result = await getImage({
    src: image,
    widths: options.widths,
    sizes: options.sizes,
    format: options.format,
    priority: options.priority,
  });

  return {
    src: result.src,
    srcSet: result.srcSet.attribute || undefined,
    sizes: result.attributes.sizes ?? options.sizes,
    width: result.attributes.width,
    height: result.attributes.height,
    loading: result.attributes.loading,
    decoding: result.attributes.decoding,
    fetchPriority: result.attributes.fetchpriority,
  };
};
