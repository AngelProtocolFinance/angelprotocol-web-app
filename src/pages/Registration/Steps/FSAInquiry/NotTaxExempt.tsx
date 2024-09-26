import type { Init } from "@better-giving/registration/models";
import LoadText from "components/LoadText";
import { APP_NAME } from "constants/env";
import { useErrorContext } from "contexts/ErrorContext";
import { Link, useNavigate } from "react-router-dom";
import { useUpdateRegMutation } from "services/aws/registration";
import { steps } from "../../routes";

interface Props extends Init {
  country: string;
  isFsaPrev: boolean;
}
export function NotTaxExempt({ country, isFsaPrev, ...init }: Props) {
  const [updateReg, { isLoading }] = useUpdateRegMutation();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <p className="text-sm text-navy-l1 dark:text-navy-l2 leading-relaxed">
        Great news: Nonprofit Organizations in{" "}
        <span className="font-semibold">{country}</span> can now take advantage
        of {APP_NAME}’s Fiscal Sponsorship service.
      </p>
      <p className="text-sm text-navy-l1 dark:text-navy-l2 leading-relaxed mt-4">
        {APP_NAME} provides fiscal sponsorship services at market-leading cost
        (2.9%) for our partner organizations worldwide to enable them to receive
        tax efficient donations from the USA. Continue to setup your fiscal
        sponsorship agreement.
      </p>
      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <Link
          aria-disabled={isLoading}
          to={`../${steps.orgDetails}`}
          state={init}
          className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <button
          onClick={async () => {
            try {
              if (isFsaPrev) {
                return navigate(`../${steps.docs}`, { state: init });
              }
              await updateReg({
                id: init.id,
                type: "fsa-inq",
                irs501c3: false,
              }).unwrap();

              navigate(`../${steps.docs}`, { state: init });
            } catch (err) {
              handleError(err, { context: "updating registration" });
            }
          }}
          disabled={isLoading}
          type="button"
          className="py-3 min-w-[8rem] btn-blue btn-reg"
        >
          <LoadText isLoading={isLoading}>Continue</LoadText>
        </button>
      </div>
    </div>
  );
}
