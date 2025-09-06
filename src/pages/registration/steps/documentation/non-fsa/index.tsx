import type { INpoWithRegNum } from "@better-giving/endowment";
import type { TRegUpdate } from "@better-giving/reg";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { NavLink, useFetcher, useNavigate } from "@remix-run/react";
import { Field, Form } from "components/form";
import { LoadText } from "components/load-text";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { steps } from "../../../routes";
import { type FV, type Props, schema } from "./types";

export function NonFsaForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    defaultValues: { o_ein: props.ein ?? "" },
  });

  const fetcher = useFetcher();
  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    if (!isDirty && props.ein) {
      return navigate(`../${steps.banking}`);
    }

    const upd8: TRegUpdate = { update_type: "ein", o_ein: fv.o_ein };

    if (fv.o_ein !== props.ein) {
      const endow = await fetch(`/api/npos/ein/${fv.o_ein}`).then<
        INpoWithRegNum | undefined
      >((r) => (r.status === 404 ? undefined : r.json()));

      if (endow) {
        if (endow.claimed ?? true) {
          return toast.info(
            `Nonprofit: ${endow.name} with EIN: ${fv.o_ein} already exists on our app. You must speak with an existing user of your NPO Account's members in order to be invited on as a member.`
          );
        }

        const convertToClaimNotif = `Nonprofit: ${endow.name} with EIN: ${fv.o_ein} already exists on our app. Would you like to claim this organization instead?`;
        if (!window.confirm(convertToClaimNotif)) return;

        upd8.claim = {
          id: endow.id,
          ein: fv.o_ein,
          name: endow.name,
        };
      }
    }

    fetcher.submit(upd8, {
      encType: "application/json",
      action: ".",
      method: "PATCH",
    });
  };

  return (
    <Form
      disabled={fetcher.state !== "idle" || isSubmitting}
      className="w-full"
      onSubmit={handleSubmit(submit)}
    >
      <Field
        {...register("o_ein")}
        /** claimer should not change EIN */
        disabled={!!props.claim}
        label="EIN# (numbers and letters only)"
        required
        classes={{ container: "mb-6 mt-1" }}
        placeholder="e.g. xxxxxxxxxxxx"
        error={errors.o_ein?.message}
      />

      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <NavLink
          aria-disabled={isSubmitting}
          to={`../${steps.fsa_inq}`}
          className="py-3 min-w-[8rem] btn-outline btn text-sm"
        >
          Back
        </NavLink>
        <button
          disabled={isSubmitting}
          type="submit"
          className="py-3 min-w-[8rem] btn btn-blue text-sm"
        >
          <LoadText isLoading={isSubmitting}>Continue</LoadText>
        </button>
      </div>
    </Form>
  );
}
