import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useNextSanityImage } from "next-sanity-image";

import type { PostDetail } from "@acme/api/src/router/post";
import { client } from "@acme/sanity";

const PostRelatedPost = ({
  relatedPosts,
}: {
  relatedPosts: PostDetail["relatedPosts"];
}) => {
  return (
    <>
      {relatedPosts && (
        <>
          <h5 className="mb-4 mt-32 text-4xl"> Related Posts</h5>
          <div className="grid grid-cols-2 gap-6 gap-y-16">
            {relatedPosts.map((post) => {
              return <SingleRelatedPost key={post._id} post={post} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default PostRelatedPost;

const SingleRelatedPost = ({
  post,
}: {
  post: PostDetail["relatedPosts"][number];
}) => {
  const imageProps = useNextSanityImage(client, post.mainImage);
  return (
    <div className="cursor-pointer" key={post._id}>
      <Link href={post.slug.current}>
        <Image
          {...imageProps}
          loader={imageProps.loader}
          blurDataURL={post.mainImage.asset.metadata.blurHash}
          alt={post.mainImage.asset.altText || "Thumbnail"}
          placeholder="blur"
          className="aspect-video w-full object-cover transition-all"
        />
        <h5 className="pt-3 text-lg">{post.title}</h5>
      </Link>
    </div>
  );
};
