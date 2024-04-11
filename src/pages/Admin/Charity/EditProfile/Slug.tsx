import { Field } from "components/form";
import { BASE_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { FV } from "./types";

export default function Slug({ initSlug = "" }) {
  const link =
    initSlug && `${window.origin}${appRoutes.marketplace}/${initSlug}`;

  return (
    <div>
      <Field<FV>
        classes="field-admin"
        name="slug"
        label="Custom Profile URL"
        placeholder="myNonprofit"
      />
      {link && (
        <div className="text-sm italic mt-1">
          <span>Current URL:</span>{" "}
          <Link to={link} className="text-blue-d1 hover:underline">
            {link}
          </Link>
        </div>
      )}
      <p className="text-xs sm:text-sm text-navy-l1 italic mt-2">
        Change your nonprofit's profile URL ending segment from the default
        numeric ID to a more human-readable value for better SEO and donor
        recognition. Only numbers and letters are permitted! Your numeric ID URL
        will continue to work. There is no risk of breaking existing links that
        have been shared.
      </p>
      <p className="text-xs sm:text-sm text-navy-l1 italic mt-1">
        Example: Setting this field as "myNonprofit" would create a new vanity
        profile URL of {BASE_URL}/marketplace/myNonProfit
      </p>
    </div>
  );
}
