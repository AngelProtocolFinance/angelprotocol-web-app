import { Field, Input, Label } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "components/Icon";
import Modal from "components/Modal";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { humanize } from "helpers";
import { useForm } from "react-hook-form";
import { schema, stringNumber } from "schemas/shape";
import { useMoveFundsMutation } from "services/apes";
import type { BalanceMovement } from "types/aws";

type Flow = keyof BalanceMovement;

interface IMoveFundForm {
  title: string;
  effect: "append" | "override";
  type: Flow;
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

  const from = props.type.split("-")[0];
  const deductions: [string, number][] = Object.entries(props.mov).filter(
    ([k, v]) => k.startsWith(from) && +v > 0
  );
  const available =
    props.balance - deductions.reduce((sum, [, v]) => v + sum, 0);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
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
                  ? available
                  : available + (props.initAmount ?? 0),
                "can't be more than available"
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
      className="fixed-center z-10 grid text-navy-d4 bg-white sm:w-full w-[90vw] sm:max-w-lg rounded-lg p-6"
    >
      <h4 className="mb-2">{props.title}</h4>
      <div className="grid grid-cols-[auto_auto_1fr] items-center mt-2 gap-x-2 gap-y-2">
        <div className="grid grid-cols-subgrid col-span-full items-center mb-4 border-b border-gray-l4 pb-2">
          <p className="text-sm mr-2 text-navy-l1">Balance</p>
          <p className="font-heading font-bold text-left">
            $ {humanize(props.balance)}
          </p>
        </div>

        {available < props.balance && (
          <>
            {deductions.map(([flow, amount]) => (
              <Deduction to={flow as Flow} amount={amount} />
            ))}
            <div className="grid grid-cols-subgrid col-span-full items-center border-t pt-2 mt-4 border-gray-l4">
              <p className="text-sm">Available</p>
              <p className="font-heading font-bold">
                $ {humanize(available ?? 0)}
              </p>
            </div>
          </>
        )}
      </div>

      <Field className="grid my-4">
        <Label className="font-semibold mb-1">
          {props.effect === "override" ? "Edit amount" : "Amount"}
          <span className="text-red"> *</span>
        </Label>
        <Input
          placeholder="e.g. $ 100"
          {...register("amount")}
          className="px-4 py-3 rounded-lg outline-blue-d1 border border-gray-l3 font-heading"
        />
        <span className="text-red text-xs text-right empty:hidden mt-1">
          {errors.amount?.message}
        </span>
      </Field>
      <button
        disabled={isSubmitting || isLoading || !isDirty}
        className="bg-blue-d1 text-sm hover:bg-blue disabled:bg-gray text-white rounded-full px-4 py-2 font-heading uppercase font-bold"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </Modal>
  );
}

interface IDeduction {
  amount: number;
  to: Flow;
}
const tos: { [K in Flow]: string } = {
  "liq-cash": "Grant",
  "liq-lock": "Investment",
  "lock-cash": "Grant",
  "lock-liq": "Savings",
};
function Deduction(props: IDeduction) {
  return (
    <div className="col-span-full grid grid-cols-subgrid text-sm">
      <div className="flex items-center gap-x-2">
        <Icon type="ArrowLeft" size={15} className="text-navy-l1" />
        <span className="text-left">$ {humanize(props.amount)}</span>
      </div>

      <span>to {tos[props.to]}</span>
    </div>
  );
}
