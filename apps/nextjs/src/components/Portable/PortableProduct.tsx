import Image from "next/image";
import Link from "next/link";
import { useNextSanityImage } from "next-sanity-image";

import type { BlockContentProduct } from "@acme/api/src/router/post";
import { client } from "@acme/sanity";

function PortableProduct({ product }: { product: BlockContentProduct }) {
  const imageProps = useNextSanityImage(client, product.mainImage);

  return (
    <>
      <Link
        href={product.slug.current}
        className="relative my-6 flex aspect-square h-36 w-full overflow-hidden rounded-md bg-gray-50 transition-all hover:scale-105 "
      >
        <div>
          <Image
            {...imageProps}
            loader={imageProps.loader}
            blurDataURL={product.mainImage.asset.metadata?.blurHash || ""}
            alt={product.mainImage.asset.altText || "Thumbnail"}
            placeholder="blur"
            className=" w-36 object-contain transition-all"
          />
          <span className="white flex-1  bg-gray-50 pl-4  pt-2 text-lg text-gray-600">
            {product.title}
          </span>
        </div>
      </Link>
    </>
  );
}

export default PortableProduct;
