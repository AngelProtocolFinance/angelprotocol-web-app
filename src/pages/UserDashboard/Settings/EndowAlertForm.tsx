import Prompt from "components/Prompt";
import { ErrorStatus, Info, LoadingStatus } from "components/Status";
import { NativeCheckField as CheckField, Form } from "components/form";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  useUpdateUserEndowsMutation,
  useUserEndowsQuery,
} from "services/aws/users";
import type { AuthenticatedUser } from "types/auth";
import type { UserEndow } from "types/aws";

interface Props {
  user: AuthenticatedUser;
  classes?: string;
}

type FV = { items: UserEndow[] };

export default function EndowAlertForm({ classes = "", user }: Props) {
  const {
    data: userEndows = [],
    isLoading,
    isError,
  } = useUserEndowsQuery(user.email);
  const [updateUserEndows, { isLoading: isUpdatingUseEndows }] =
    useUpdateUserEndowsMutation();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();

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

  if (isLoading) {
    return (
      <LoadingStatus classes="mt-4">Loading your organizations</LoadingStatus>
    );
  }

  if (isError) {
    return (
      <ErrorStatus classes="mt-4">
        Failed to load your organizations
      </ErrorStatus>
    );
  }

  if (userEndows.length === 0) {
    return <Info classes="mt-4">No organizations found</Info>;
  }

  const onSubmit: SubmitHandler<FV> = async (fv) => {
    try {
      await updateUserEndows({
        userId: user.email,
        alertPrefs: fv.items.map((item) => ({
          endowId: item.endowID,
          banking: item.alertPref?.banking ?? true,
          donation: item.alertPref?.banking ?? true,
        })),
      });
      showModal(Prompt, {
        type: "success",
        children: "Email preference updated!",
      });
    } catch (err) {
      handleError(err, { context: "updating alert preferences" });
    }
  };

  return (
    <Form
      disabled={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
      className={`${classes} grid grid-cols-[3fr_2fr_2fr] divide-y divide-gray-l4`}
    >
      <div className="grid grid-cols-subgrid col-span-3 py-3 font-bold text-sm">
        <h5 className="pl-3">Alerts from</h5>
        <h5>New donations</h5>
        <h5>Banking changes</h5>
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

      <div className="col-span-full flex justify-end items-center gap-4 pt-4">
        <button
          disabled={!isDirty}
          type="submit"
          className="btn-blue text-sm px-6 py-2"
        >
          {isUpdatingUseEndows ? "updating.." : "save"}
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
