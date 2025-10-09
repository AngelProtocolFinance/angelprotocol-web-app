import type { ReactNode } from "react";
import { Link, href } from "react-router";

const gen_link = (slug: string, base_url: string) =>
  `${base_url}${href("/marketplace/:id", { id: slug })}`;

interface Props {
  init_slug?: string;
  new_slug: string;
  slug_field: ReactNode;
  base_url: string;
}
export function Slug({
  init_slug = "",
  new_slug,
  slug_field,
  base_url,
}: Props) {
  const link = init_slug && gen_link(init_slug, base_url);

  return (
    <div>
      {slug_field}
      {link && (
        <div className="text-sm italic mt-1">
          <span>Current URL:</span>{" "}
          <Link to={link} className="text-blue-d1 hover:underline">
            {link}
          </Link>
        </div>
      )}
      <p className="text-xs sm:text-sm text-gray italic mt-2">
        Change your nonprofit's profile URL ending segment from the default
        numeric ID to a more human-readable value for better SEO and donor
        recognition. Only numbers and letters are permitted! Your numeric ID URL
        will continue to work. There is no risk of breaking existing links that
        have been shared.
      </p>

      <p className="text-xs sm:text-sm text-gray italic mt-2">
        Example: {gen_link(new_slug || "myNonprofit", base_url)}
      </p>
    </div>
  );
}
