import type { IRegUpdate } from "@better-giving/reg";
import { NavLink, useFetcher, useNavigate } from "@remix-run/react";
import { LoadText } from "components/load-text";
import { useForm } from "react-hook-form";
import { steps } from "../../routes";
import type { FV } from "./types";

interface Props {
  is_501c3_prev?: boolean;
  is_501c3_init?: boolean;
}

export function PossiblyTaxExempt({ is_501c3_prev, is_501c3_init }: Props) {
  const {
    handleSubmit,
    register,
    formState: { isDirty },
  } = useForm<FV>({
    defaultValues: {
      irs501c3: is_501c3_prev || is_501c3_init ? "yes" : "no",
    },
  });

  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";
  const navigate = useNavigate();

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit(async (fv) => {
        if (!isDirty && is_501c3_prev != null) {
          return navigate(`../${steps.docs}`);
        }

        fetcher.submit(
          {
            update_type: "fsa-inq",
            status: "01",
            o_type: fv.irs501c3 === "yes" ? "501c3" : "other",
          } satisfies IRegUpdate,
          { method: "PATCH", encType: "application/json" }
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
            disabled={is_501c3_init}
          />
        </div>
        <div className="flex items-center gap-1">
          <label htmlFor="radio_no">No</label>
          <input
            id="radio_no"
            type="radio"
            {...register("irs501c3")}
            value={"no" satisfies FV["irs501c3"]}
            disabled={is_501c3_init}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <NavLink
          aria-disabled={isLoading}
          to={`../${steps.org_details}`}
          className="py-3 min-w-[8rem] btn-outline btn text-sm"
        >
          Back
        </NavLink>
        <button
          disabled={isLoading}
          type="submit"
          className="py-3 min-w-[8rem] btn btn-blue text-sm"
        >
          <LoadText isLoading={isLoading}>Continue</LoadText>
        </button>
      </div>
    </form>
  );
}
