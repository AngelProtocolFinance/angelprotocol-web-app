import { useFetcher } from "@remix-run/react";
import { Info } from "components/Status";
import { NativeCheckField as CheckField, Form } from "components/form";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import type { UserV2 } from "types/auth";
import type { UserEndow } from "types/aws";

interface Props {
  user: UserV2;
  userEndows: UserEndow[];
  classes?: string;
}

type FV = { items: UserEndow[] };

export default function EndowAlertForm({ classes = "", userEndows }: Props) {
  const fetcher = useFetcher();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<FV>({
    values: {
      items: userEndows.map((endow) => ({
        ...endow,
        //if preference is not specified, set to `true`
        alertPref: endow.alertPref ?? { banking: true, donation: true },
      })),
    },
  });

  const { fields } = useFieldArray({ control, name: "items" });

  if (userEndows.length === 0) {
    return <Info classes="mt-4">No organizations found</Info>;
  }

  const onSubmit: SubmitHandler<FV> = async (fv) => {
    fetcher.submit(
      fv.items.map((item) => ({
        endowId: item.endowID,
        banking: item.alertPref?.banking ?? true,
        donation: item.alertPref?.banking ?? true,
      })),
      { encType: "application/json", method: "POST", action: "." }
    );
  };

  return (
    <Form
      disabled={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
      className={`${classes} grid grid-cols-[auto_auto_auto] divide-y divide-gray-l4 border-b border-x border-gray-l4`}
    >
      <div className="grid grid-cols-subgrid col-span-3 font-bold text-sm border-t border-gray-l4">
        <h5 className="p-3">Receive Email Alerts for</h5>
        <h5 className="p-3">New donations</h5>
        <h5 className="p-3">Banking changes</h5>
      </div>
      {fields.map((field, idx) => (
        <div
          key={field.id}
          className="grid grid-cols-subgrid col-span-3 divide-x divide-gray-l4"
        >
          <div className="p-3">
            {field.name ?? `Endowment: ${field.endowID}`}
          </div>
          {
            <CheckField
              classes="px-4"
              {...register(`items.${idx}.alertPref.donation`)}
            />
          }
          {
            <CheckField
              classes="px-4"
              {...register(`items.${idx}.alertPref.banking`)}
            />
          }
        </div>
      ))}

      <div className="col-span-full flex justify-end items-center gap-4 p-4">
        <button
          disabled={!isDirty || fetcher.state === "submitting"}
          type="submit"
          className="btn-blue text-sm px-6 py-2"
        >
          {fetcher.state === "submitting" ? "updating.." : "save"}
        </button>
        <button
          disabled={!isDirty}
          type="reset"
          className="btn-outline-filled text-sm px-6 py-2"
        >
          reset
        </button>
      </div>
    </Form>
  );
}
