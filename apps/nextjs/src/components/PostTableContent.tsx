import React from "react";
import slugify from "slugify";

import type { BlockContent } from "@acme/api/src/router/post";

import { cx } from "~/utils/cx";

const transform = (headings: BlockContent[]) => {
  const transformed = headings.map((heading) => {
    const level = parseInt(heading.style.replace("h", ""));

    const text = heading.children.map((c) => c.text).join(" ");
    const slug = slugify(text);
    return { level, text, slug };
  });

  return transformed;
};

const getHeadingTag = (level: number, text: string) => {
  if (level === 2) {
    return <h2> {text}</h2>;
  }
  if (level === 3) {
    return <h3> {text}</h3>;
  }
  if (level === 4) {
    return <h4> {text}</h4>;
  }
};

export const TableContent = (props: { headings: Array<BlockContent> }) => {
  const { headings } = props;
  const transformedHeading = transform(headings);

  return (
    <>
      <p className="mb-3 text-3xl font-bold">Inhalt</p>
      <ol className="mx-4">
        {transformedHeading.map((heading) => {
          console.log(heading);
          const level = heading.level;
          return (
            <li
              key={heading.slug}
              className={cx(
                level === 2 ? "pb-1 " : "",
                level === 3 ? "ml-4 " : "",
                level === 4 ? "ml-6" : "",
              )}
            >
              <a
                href={`#${heading.slug}`}
                className={cx(
                  "hover:text-green-500",
                  level === 2 ? "text-base font-semibold " : "",
                  level === 3 ? "text-base" : "",
                  level === 4 ? "text-base" : "",
                )}
              >
                {getHeadingTag(level, heading.text)}
              </a>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default TableContent;
