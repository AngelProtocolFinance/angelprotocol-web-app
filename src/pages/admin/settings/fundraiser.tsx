import { valibotResolver } from "@hookform/resolvers/valibot";
import { CheckField, Form as F } from "components/form";
import { use_action_result } from "hooks/use-action-result";
import { useForm } from "react-hook-form";
import { useFetcher } from "react-router";
import type { ActionData } from "types/action";
import * as v from "valibot";

const schema = v.object({
  fundOptIn: v.boolean(),
});

type FV = v.InferInput<typeof schema>;

interface Props {
  fundOptIn: boolean;
}

export function FundraiserTab({ fundOptIn }: Props) {
  const fetcher = useFetcher<ActionData>();
  use_action_result(fetcher.data);

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    values: {
      fundOptIn,
    },
  });

  const onSubmit = handleSubmit(async (fv) => {
    fetcher.submit({ fund_opt_in: fv.fundOptIn } as any, {
      method: "POST",
      action: ".",
      encType: "application/json",
    });
  });

  return (
    <F
      disabled={isSubmitting || fetcher.state !== "idle"}
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
      onSubmit={onSubmit}
      className="grid content-start gap-6"
    >
      <div>
        <CheckField {...register("fundOptIn")} classes="font-medium">
          Allow Fundraisers to be created on behalf of your nonprofit
        </CheckField>
        <p className="text-xs sm:text-sm text-gray italic mt-1">
          Fundraising functionality is optional for all Better Giving
          nonprofits. By opting in, people will be able to create fundraisers on
          your behalf. You will receive 100% of funds raised for fundraisers
          specific to your organization, and a percentage split of fundraisers
          involving multiple nonprofits (such as curated giving indexes).
        </p>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          type="reset"
          className="px-6 btn-outline btn text-sm"
          disabled={!isDirty}
        >
          Reset changes
        </button>
        <button
          type="submit"
          className="px-6 btn btn-blue text-sm"
          disabled={!isDirty}
        >
          Submit changes
        </button>
      </div>
    </F>
  );
}
