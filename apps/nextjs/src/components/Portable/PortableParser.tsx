import dynamic from "next/dynamic";
import {
  PortableText,
  type PortableTextMarkComponentProps,
} from "@portabletext/react";
import slugify from "slugify";

import type {
  BlockContent,
  BlockContentPost,
  BlockContentProduct,
} from "@acme/api/src/router/post";

const PortablePost = dynamic(
  () => {
    return import("./PortablePost");
  },
  { ssr: false },
);

const PortableProduct = dynamic(
  () => {
    return import("./PortableProduct");
  },
  { ssr: false },
);

const PortableParser = ({ body }: { body: Array<BlockContent> }) => {
  return (
    <PortableText
      value={body}
      components={{
        block: {
          h1: ({ children }) => (
            <h1 className="my-5 text-4xl font-bold"> {children}</h1>
          ),
          h2: ({ children }) => {
            const text = Array(children).join(" ");
            return (
              <h2
                className="mb-1 mt-12 text-2xl font-semibold"
                id={slugify(text)}
              >
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = Array(children).join(" ");
            return (
              <h2
                className="mb-2 mt-8 text-xl font-semibold"
                id={slugify(text)}
              >
                {children}
              </h2>
            );
          },
          h4: ({ children }) => {
            const text = Array(children).join(" ");
            return (
              <h2 className="my-5 text-base font-semibold" id={slugify(text)}>
                {children}
              </h2>
            );
          },
          li: ({ children }) => <li className="ml-12 list-disc">{children}</li>,
        },
        marks: {
          internalLink: (
            props: PortableTextMarkComponentProps<{
              reference: BlockContentProduct | BlockContentPost;
              _type: string;
              _key: string;
            }>,
          ) => {
            if (!props.value) return null;

            console.log("here ", props.value);
            if (props.value.reference._type === "product") {
              return <PortableProduct product={props.value.reference} />;
            }
            if (props.value.reference._type === "post") {
              console.log("here ", props.value);
              return <PortablePost post={props.value.reference} />;
            }

            return <></>;
          },
        },
      }}
    />
  );
};

export default PortableParser;
