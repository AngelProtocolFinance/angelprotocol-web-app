import { Link } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import { appRoutes } from "constants/routes";
import type { ReactNode } from "react";
import type { LoaderData } from "./api";

const genLink = (slug: string, origin: string) =>
  `${origin}${appRoutes.marketplace}/${slug}`;

interface Props {
  initSlug?: string;
  newSlug: string;
  slugField: ReactNode;
}
export default function Slug({ initSlug = "", newSlug, slugField }: Props) {
  const { origin } = useCachedLoaderData() as LoaderData;
  const link = initSlug && genLink(initSlug, origin);

  return (
    <div>
      {slugField}
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
        Example: {genLink(newSlug || "myNonprofit", origin)}
      </p>
    </div>
  );
}
