import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { sanityImageObjectExtendedZ, slugSchema } from "@acme/sanity";

import { createTRPCRouter, publicProcedure } from "../trpc";

const AuthorSchema = z.object({
  _createdAt: z.string(),
  _id: z.string(),
  _rev: z.string(),
  _type: z.string(),
  _updatedAt: z.string(),
  name: z.string(),
  slug: z.object({ _type: z.string(), current: z.string() }),
});

const BlockContentSchema = z.object({
  _key: z.string(),
  _type: z.string(),
  children: z.array(
    z.object({
      _key: z.string(),
      _type: z.string(),
      marks: z.array(z.unknown()),
      text: z.string(),
    }),
  ),
  markDefs: z.array(z.unknown()),
  style: z.string(),
});

export type BlockContent = z.infer<typeof BlockContentSchema>;

const CategorySchema = z.object({
  _createdAt: z.string(),
  _id: z.string(),
  _rev: z.string(),
  _type: z.string(),
  _updatedAt: z.string(),
  color: z.string(),
  mainImage: z.object({
    _type: z.string(),
    altText: z.string(),
    asset: z.object({ _ref: z.string(), _type: z.string() }),
  }),
  slug: z.object({ _type: z.string(), current: z.string() }),
  title: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

const BlockContentProduct = z.object({
  _id: z.string(),
  _type: z.string(),
  slug: z.object({ _type: z.string(), current: z.string() }),
  title: z.string(),
  mainImage: sanityImageObjectExtendedZ,
  categories: z.array(CategorySchema),
});

const BlockContentPost = z.object({
  _id: z.string(),
  _type: z.string(),
  slug: z.object({ _type: z.string(), current: z.string() }),
  title: z.string(),
  mainImage: sanityImageObjectExtendedZ,
  categories: z.array(CategorySchema),
});

export type BlockContentPost = z.infer<typeof BlockContentPost>;
export type InternalLink = { children: string[]; reference: BlockContentPost };

export type BlockContentProduct = z.infer<typeof BlockContentProduct>;

const PostSchema = z.object({
  title: z.string(),
  _id: z.string(),
  _type: z.string(),
  slug: slugSchema,
  seoKeywords: z.array(z.string()).optional(),
  seoTitle: z.string().optional(),
  mainImage: sanityImageObjectExtendedZ,
});

const PostSchemaDetailView = z.object({
  ...PostSchema.shape,
  author: AuthorSchema,
  categories: z.array(CategorySchema),
  body: z.array(BlockContentSchema),
  headings: z.array(BlockContentSchema),
  relatedPosts: z.array(PostSchema),
});
export type PostDetail = z.infer<typeof PostSchemaDetailView>;

const PostSchemaList = z.array(PostSchema);

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    try {
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
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new TRPCError({ code: "BAD_REQUEST" });
    }
  }),

  detail: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const query = `*[_type == 'post' && slug.current == $slug][0] {
      ...,
      "headings": body[length(style) == 2 && string::startsWith(style, "h")],
      author->,
      body[]{
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            ...,
            reference-> { 
              title,
              _id,
              _type,
              slug,
              categories[]->,
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
                },
            }
          }
        }
      },
      relatedPosts[]-> {
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
          },
        categories[]->
      },
      categories[]->,
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
        },
      }`;

        const unSafePost = await ctx.sanity.fetch<unknown>(query, {
          slug: input.slug,
        });

        const safedParsedPost = PostSchemaDetailView.safeParse(unSafePost);
        if (safedParsedPost.success === false) {
          console.log(JSON.stringify(unSafePost, null, 2));
          // console.log(
          //   "safedParsedPost.error",
          //   JSON.stringify(safedParsedPost.error, null, 2),
          // );
        }
        return PostSchemaDetailView.parse(unSafePost);
      } catch (error) {
        // console.log(JSON.stringify(error, null, 2));
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),
});
