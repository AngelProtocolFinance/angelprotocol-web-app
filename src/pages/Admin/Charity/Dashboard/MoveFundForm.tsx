import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { humanize } from "helpers";
import { ArrowLeft, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  useFetcher,
  useNavigate,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";
import { schema, stringNumber } from "schemas/shape";
import type { BalanceMovement } from "types/aws";
import type { DashboardData } from "./route";

type Flow = keyof BalanceMovement;

const titles: { [K in Flow]: string } = {
  "liq-cash": "Withdraw from savings",
  "liq-lock": "Invest savings",
  "lock-cash": "Withdraw from investments",
  "lock-liq": "Transfer to Savings",
};

interface IMoveFundForm {
  title: string;
  effect: "append" | "override";
  type: Flow;
  min?: number;
  balance: number;
  mov: BalanceMovement;
  initAmount?: number;
}

export function MoveFundForm() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { bal } = useRouteLoaderData("dashboard") as DashboardData;

  const mov = bal.movementDetails ?? {
    "liq-cash": 0,
    "liq-lock": 0,
    "lock-cash": 0,
    "lock-liq": 0,
  };

  const effect = params.get("effect") as "append" | "override";
  const flow = params.get("flow") as Flow;
  const initAmount = params.get("initAmount");
  const min = +(params.get("min") ?? "0");

  const bals: { [K in Flow]: number } = {
    "liq-cash": bal.liq ?? 0,
    "liq-lock": bal.liq ?? 0,
    "lock-cash": bal.sustainabilityFundBal,
    "lock-liq": bal.sustainabilityFundBal,
  };

  return (
    <Dialog
      open={true}
      onClose={() =>
        navigate("..", { replace: true, preventScrollReset: true })
      }
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 data-[closed]:opacity-0" />
      <Content
        type={flow}
        balance={bals[flow]}
        mov={mov}
        title={titles[flow]}
        effect={effect}
        initAmount={initAmount ? +initAmount : undefined}
        min={min}
      />
    </Dialog>
  );
}

function Content(props: IMoveFundForm) {
  const fetcher = useFetcher({ key: "bal-mov" });
  type FV = { amount: string };

  const from = props.type.split("-")[0];
  const deductions = Object.entries(props.mov).filter(
    ([k, v]) => k.startsWith(from) && +v > 0
  );
  const available =
    props.balance - deductions.reduce((sum, [, v]) => +v + sum, 0);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<FV>({
    defaultValues: { amount: props.initAmount?.toString() || "" },
    resolver: yupResolver(
      schema<FV>({
        amount: stringNumber(
          (s) => s.required("required"),
          (n) =>
            n
              .min(
                props.min ?? 0,
                props.min ? `minimum of $${props.min}` : "can't be negative"
              )
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
    <DialogPanel
      onSubmit={handleSubmit(async (fv) => {
        const mov: BalanceMovement = {
          ...props.mov,
          [props.type]:
            props.effect === "append"
              ? props.mov[props.type] + +fv.amount
              : +fv.amount,
        };
        fetcher.submit(mov as any, {
          action: ".",
          method: "put",
          encType: "application/json",
        });
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
              <Deduction
                key={flow}
                to={flow as Flow}
                amount={amount}
                isEditing={flow === props.type && props.effect === "override"}
              />
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
        disabled={fetcher.state !== "idle" || !isDirty}
        className="bg-blue-d1 text-sm hover:bg-blue disabled:bg-gray text-white rounded-full px-4 py-2 font-heading uppercase font-bold"
      >
        {fetcher.state !== "idle" ? "Submitting..." : "Submit"}
      </button>
    </DialogPanel>
  );
}

interface IDeduction {
  amount: number;
  to: Flow;
  isEditing?: boolean;
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
      <p className="flex items-center">
        <ArrowLeft size={15} className="text-navy-l1 mr-1" />
        <span className="text-left">{tos[props.to]}</span>
      </p>
      <span className="text-left">
        $ {humanize(props.amount)}{" "}
        {props.isEditing && (
          <Pencil
            size={12}
            className="inline bottom-px relative animate-bounce text-amber-d2"
          />
        )}
      </span>
    </div>
  );
}
