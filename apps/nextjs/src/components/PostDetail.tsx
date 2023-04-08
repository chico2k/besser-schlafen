import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import { type PostDetail } from "@acme/api/src/router/post";
import { client } from "@acme/sanity";

import CategoryLabel from "./Category";
import PortableParser from "./Portable/PortableParser";
import TableContent from "./PostTableContent";

const PostRelatedPost = dynamic(
  () => {
    return import("./PostRelatedPost");
  },
  { ssr: false },
);

const PostDetailComp: React.FunctionComponent<{ post: PostDetail }> = ({
  post,
}) => {
  const imageProps = useNextSanityImage(client, post.mainImage);

  return (
    <main>
      <div className="relative overflow-hidden  bg-gray-100  dark:bg-gray-800">
        {post.mainImage && (
          <Image
            {...imageProps}
            loader={imageProps.loader}
            placeholder="blur"
            blurDataURL={post.mainImage.asset.metadata.blurHash}
            alt={post.mainImage.asset.altText || "Thumbnail"}
            className="h-96 w-full  object-cover"
          />
        )}
      </div>
      <div className="mx-16">
        <h1 className="text-brand-primary mt-2 pt-12 text-6xl font-semibold tracking-normal">
          {post.title}
        </h1>
        <CategoryLabel categories={post.categories} className="mt-2 text-sm" />
        <div className="my-12">
          <TableContent headings={post.headings} />
          <PortableParser body={post.body} />
        </div>

        <PostRelatedPost relatedPosts={post.relatedPosts} />
      </div>
    </main>
  );
};
export default PostDetailComp;
