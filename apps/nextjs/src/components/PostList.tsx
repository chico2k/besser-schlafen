import React from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useNextSanityImage } from "next-sanity-image";

import { client } from "@acme/sanity";

import { api, type RouterOutputs } from "~/utils/api";

const PostList = () => {
  const { data } = api.post.all.useQuery();
  return (
    <div className="grid grid-cols-2 gap-4">
      {data?.map((post) => {
        return <PostCard key={post._id} {...post} />;
      })}
    </div>
  );
};

export default PostList;

const PostCard = (post: RouterOutputs["post"]["all"][number]) => {
  const imageProps = useNextSanityImage(client, post.mainImage);
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <a href="#">
        <NextImage
          {...imageProps}
          loader={imageProps.loader}
          blurDataURL={post.mainImage.asset.metadata.blurHash}
          alt={post.mainImage.asset.altText || "Thumbnail"}
          placeholder="blur"
          className="aspect-video w-full object-cover transition-all"
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {post.slug.current}
        </p>
        <Link
          href={`/${post.slug.current}`}
          className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            aria-hidden="true"
            className="-mr-1 ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};
