import { Field } from "components/form";
import { FV } from "./types";

export default function Slug() {
  return (
    <div>
      <Field<FV>
        classes="field-admin"
        name="slug"
        label='"Vanity" Profile URL'
        placeholder="myNonprofit"
      />
      <p className="text-xs sm:text-sm text-navy-l1 mt-4">
        Change your nonprofit's profile URL ending segment from the default
        numeric ID to a more human-readable value for better SEO and donor
        recognition.{" "}
        <span className="text-navy-d4 font-medium">
          Only numbers and letters are permitted!
        </span>{" "}
        Your numeric ID URL will continue to work. There is no risk of breaking
        existing links that have been shared.
      </p>
      <p className="text-xs sm:text-sm text-navy-l1 mt-1">
        Example: Setting this field as{" "}
        <span className="font-medium text-navy-d4">"myNonprofit"</span> would
        create a new vanity profile URL of{" "}
        <span className="text-navy-d4 font-medium">
          {"{{baseURL}}"}/marketplace?slug=myNonProfit
        </span>
      </p>
    </div>
  );
}
