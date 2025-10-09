import type { ReactNode } from "react";
import { Link, href } from "react-router";

const get_link = (slug: string, base_url: string) =>
  `${base_url}${href("/fundraisers/:fundId", { fundId: slug })}`;

interface Props {
  slug_init?: string;
  slug_new: string;
  slug_field: ReactNode;
  base_url: string;
}
export function Slug({
  slug_init = "",
  slug_new,
  slug_field,
  base_url,
}: Props) {
  const link = slug_init && get_link(slug_init, base_url);

  return (
    <div className="mt-4 mb-1">
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
        Change your fundraiser's profile URL ending segment from the default
        alphanumeric ID to a more human-readable value for better SEO and donor
        recognition. Only numbers and letters are permitted! Your alphanumeric
        ID URL will continue to work. There is no risk of breaking existing
        links that have been shared.
      </p>

      <p className="text-xs sm:text-sm text-gray italic mt-2">
        Example: {get_link(slug_new || "myFundraiser", base_url)}
      </p>
    </div>
  );
}
