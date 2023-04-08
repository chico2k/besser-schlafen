import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import type { BlockContentPost } from "@acme/api/src/router/post";
import { client } from "@acme/sanity";

function PortablePost({ post }: { post: BlockContentPost }) {
  const imageProps = useNextSanityImage(client, post.mainImage);
  return (
    <>
      <div className="mx-0 my-12 grid h-48 grid-cols-2 gap-3 overflow-hidden bg-white px-0">
        <Image
          {...imageProps}
          loader={imageProps.loader}
          blurDataURL={post.mainImage.asset.metadata?.blurHash || ""}
          alt={post.mainImage.asset.altText || "Thumbnail"}
          placeholder="blur"
          className="  w-full  object-contain transition-all"
        />
        <div className="flex flex-col text-2xl">
          <span> {post.title}</span>
          <div>
            <button
              type="button"
              className=" g rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
            >
              Mehr
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PortablePost;
