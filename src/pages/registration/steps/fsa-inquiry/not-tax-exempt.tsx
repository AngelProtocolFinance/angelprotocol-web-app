import type { Init } from "@better-giving/registration/models";
import type { Update } from "@better-giving/registration/update";
import { NavLink, useFetcher, useNavigate } from "@remix-run/react";
import { LoadText } from "components/load-text";
import { APP_NAME } from "constants/env";
import { steps } from "../../routes";

interface Props extends Init {
  country: string;
  isFsaPrev?: boolean;
}
export function NotTaxExempt({ country, isFsaPrev }: Props) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const isLoading = fetcher.state !== "idle";

  return (
    <div className="w-full">
      <p className="text-sm text-gray dark:text-gray leading-relaxed">
        Great news: Nonprofit Organizations in{" "}
        <span className="font-semibold">{country}</span> can now take advantage
        of {APP_NAME}’s Fiscal Sponsorship service.
      </p>
      <p className="text-sm text-gray dark:text-gray leading-relaxed mt-4">
        {APP_NAME} provides fiscal sponsorship services at market-leading cost
        (2.9%) for our partner organizations worldwide to enable them to receive
        tax efficient donations from the USA. Continue to setup your fiscal
        sponsorship agreement.
      </p>
      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <NavLink
          aria-disabled={isLoading}
          to={`../${steps.orgDetails}`}
          className="py-3 min-w-[8rem] btn-outline btn text-sm"
        >
          Back
        </NavLink>
        <button
          onClick={async () => {
            if (isFsaPrev) {
              return navigate(`../${steps.docs}`);
            }

            fetcher.submit(
              {
                type: "fsa-inq",
                irs501c3: false,
              } satisfies Update,
              {
                action: ".",
                method: "PATCH",
                encType: "application/json",
              }
            );
          }}
          disabled={isLoading}
          type="button"
          className="py-3 min-w-[8rem] btn btn-blue text-sm"
        >
          <LoadText isLoading={isLoading}>Continue</LoadText>
        </button>
      </div>
    </div>
  );
}
