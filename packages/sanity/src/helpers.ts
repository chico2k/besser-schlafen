import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { type z } from "zod";

import { sanityConfig } from "./config";

export const urlFor = (source: SanityImageSource) => {
  return imageUrlBuilder(sanityConfig).image(source);
};

// Helper function to generate zod parsers from existing types
export const schemaForType =
  <T>() =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };
