import type { Category } from "@acme/api/src/router/post";

import { cx } from "~/utils/cx";

const colorMap = new Map(
  Object.entries({
    green: "text-green-500",
    blue: "text-blue-500",
    orange: "text-orange-400",
    purple: "text-purple-500",
    pink: "text-pink-500",
  }),
);

const CategoryLabel: React.FunctionComponent<{
  categories?: Category[];
  className?: string;
}> = ({ categories, className }) => {
  if (categories && categories?.length < 1)
    return (
      <span
        className={cx(
          "inline-block  font-medium uppercase tracking-wider ",
          "text-pink-500",
          className ? className : "",
        )}
      >
        Generell
      </span>
    );

  return (
    <div className="flex gap-x-3">
      {categories &&
        categories.map((category, index) => {
          const catColor = colorMap.get(category.color) || "text-gray-500";

          return (
            <span
              key={`${category}_id-${index}`}
              className={cx(
                "inline-block font-medium uppercase tracking-wider ",
                catColor,
                className ? className : "",
              )}
            >
              {category.title}
            </span>
          );
        })}
    </div>
  );
};

export default CategoryLabel;
