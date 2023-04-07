import { z } from "zod";

import { sanityImageObjectExtendedZ, slugSchema } from "@acme/sanity";

import { createTRPCRouter, publicProcedure } from "../trpc";

const PostSchema = z.object({
  title: z.string(),
  _id: z.string(),
  slug: slugSchema,
  mainImage: sanityImageObjectExtendedZ,
});

const PostSchemaList = z.array(PostSchema);

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const query = `*[_type == "post"] {
      ...,
      mainImage {
        crop,
        hotspot,
        asset->{
          _id,
          _type,
          altText,
          metadata {
            description,
            blurHash
            },
        },
      }
    }`;

    const unSafePost = await ctx.sanity.fetch<unknown>(query);

    return PostSchemaList.parse(unSafePost);
  }),

  detail: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const query = `*[_type == 'post' && slug.current == $slug][0] {
      ...,
      mainImage {
        crop,
        hotspot,
        asset->{
          _id,
          _type,
          altText,
          metadata {
            description,
            blurHash
            },
          }
        }
      }`;

      const unSafePost = await ctx.sanity.fetch<unknown>(query, {
        slug: input.slug,
      });

      return PostSchema.parse(unSafePost);
    }),
});
