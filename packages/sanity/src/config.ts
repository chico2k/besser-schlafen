import type { SanityProjectDetails } from "@sanity/image-url/lib/types/types";

const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: process.env.NEXT_PUBLIC_SANITY_CDN == "true" ? true : false,
  apiVersion: "2022-01-12",
} as SanityProjectDetails;

export { sanityConfig };
