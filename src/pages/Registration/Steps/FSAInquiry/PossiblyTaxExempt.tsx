import type { Init } from "@better-giving/registration/models";
import type { Update } from "@better-giving/registration/update";
import LoadText from "components/LoadText";
import { useForm } from "react-hook-form";
import { Link, useFetcher, useNavigate } from "react-router";
import { steps } from "../../routes";
import type { FV } from "./types";

interface Props extends Init {
  irs501c3Prev?: boolean;
}

export function PossiblyTaxExempt({ irs501c3Prev, ...init }: Props) {
  const {
    handleSubmit,
    register,
    formState: { isDirty },
  } = useForm<FV>({
    defaultValues: {
      irs501c3:
        irs501c3Prev ||
        /** US-based unclaimed endowments are authorized by default */
        init.claim
          ? "yes"
          : "no",
    },
  });

  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";
  const navigate = useNavigate();

  //orgs to claim are irs501c3 tax exempt
  const optionsDisabled = !!init.claim;

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit(async (fv) => {
        if (!isDirty && irs501c3Prev !== undefined) {
          return navigate(`../${steps.docs}`);
        }

        fetcher.submit(
          {
            type: "fsa-inq",
            irs501c3: fv.irs501c3 === "yes",
          } satisfies Update,
          { action: ".", method: "PATCH", encType: "application/json" }
        );
      })}
    >
      <p className="mt-6">
        Is your organization recognized by the Internal Revenue Service as a
        nonprofit organization exempt under IRC 501(c)(3)?{" "}
      </p>
      <div className="flex gap-4 mt-4 accent-blue-d1 text-sm">
        <div className="flex items-center gap-1">
          <label htmlFor="radio_yes">Yes</label>
          <input
            id="radio_yes"
            type="radio"
            {...register("irs501c3")}
            value={"yes" satisfies FV["irs501c3"]}
            disabled={optionsDisabled}
          />
        </div>
        <div className="flex items-center gap-1">
          <label htmlFor="radio_no">No</label>
          <input
            id="radio_no"
            type="radio"
            {...register("irs501c3")}
            value={"no" satisfies FV["irs501c3"]}
            disabled={optionsDisabled}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <Link
          aria-disabled={isLoading}
          to={`../${steps.orgDetails}`}
          className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <button
          disabled={isLoading}
          type="submit"
          className="py-3 min-w-[8rem] btn-blue btn-reg"
        >
          <LoadText isLoading={isLoading}>Continue</LoadText>
        </button>
      </div>
    </form>
  );
}
