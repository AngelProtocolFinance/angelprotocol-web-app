import { Field, Input, Label } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "components/Modal";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { humanize } from "helpers";
import { useForm } from "react-hook-form";
import { schema, stringNumber } from "schemas/shape";
import { useMoveFundsMutation } from "services/apes";
import type { BalanceMovement } from "types/aws";

interface IMoveFundForm {
  effect: "append" | "override";
  type: keyof BalanceMovement;
  endowId: number;
  balance: number;
  mov: BalanceMovement;
  initAmount?: number;
}

export function MoveFundForm(props: IMoveFundForm) {
  const [moveFund, { isLoading }] = useMoveFundsMutation();
  const { closeModal } = useModalContext();
  const { handleError } = useErrorContext();
  type FV = { amount: string };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FV>({
    defaultValues: { amount: props.initAmount?.toString() || "" },
    resolver: yupResolver(
      schema<FV>({
        amount: stringNumber(
          (s) => s.required("required"),
          (n) =>
            n
              .min(0, "can't be negative")
              .max(
                props.effect === "append"
                  ? props.balance
                  : props.balance + (props.initAmount ?? 0),
                "can't be more than balance"
              )
        ),
      })
    ),
  });

  return (
    <Modal
      onSubmit={handleSubmit(async (fv) => {
        try {
          await moveFund({
            endowId: props.endowId,
            ...props.mov,
            [props.type]:
              props.effect === "append"
                ? props.mov[props.type] + +fv.amount
                : +fv.amount,
          }).unwrap();
          closeModal();
        } catch (err) {
          handleError(err, { context: "moving funds" });
        }
      })}
      as="form"
      className="fixed-center z-10 grid gap-y-4 text-navy-d4 bg-white sm:w-full w-[90vw] sm:max-w-lg rounded-lg p-6"
    >
      <p className="flex items-center gap-2">
        <span className="text-navy-l1 text-sm">Available balance</span>
        <span className="font-semibold font-heading">
          $ {humanize(props.balance)}
        </span>
      </p>
      <Field className="grid">
        <Label className="font-semibold mb-1">
          {props.effect === "override" ? "Edit amount" : "Amount"}
          <span className="text-red"> *</span>
        </Label>
        <Input
          placeholder="e.g. $ 100"
          {...register("amount")}
          className="px-4 py-3 rounded-lg outline-blue-d1 border border-gray-l3"
        />
        <span className="text-red text-xs text-right empty:hidden mt-1">
          {errors.amount?.message}
        </span>
      </Field>
      <button
        disabled={isSubmitting || isLoading}
        className="bg-blue-d1 hover:bg-blue disabled:bg-gray text-white rounded-full px-4 py-2 font-heading uppercase font-bold"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </Modal>
  );
}
