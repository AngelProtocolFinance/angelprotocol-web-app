import { useFormContext } from "react-hook-form";
import { AccountBalances, FormValues as FV } from "./types";
import { AWSstrategy } from "types/aws";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import Modal from "components/Modal";
import TokenField from "components/TokenField";
import { Tooltip } from "components/admin";
import Summary from "../Summary";
import AccountOptions from "./AccountOptions";

type FormProps = AWSstrategy & {
  accountBalances: AccountBalances;
  error?: string;
};
export default function Form(props: FormProps) {
  const { getValues, handleSubmit } = useFormContext<FV>();
  const { closeModal, showModal } = useModalContext();
  const { error, name, description, rating, accountBalances } = props;
  return (
    <Modal
      as="form"
      onSubmit={handleSubmit((fv) => {
        showModal(Summary, {
          ...props,
          token: fv.token,
          type: fv.type,
        });
      })}
      className="max-h-[95vh] overflow-y-auto max-w-[37.5rem] w-[95vw] sm:w-full fixed-center z-20 bg-gray-l6 dark:bg-blue-d6 border border-prim rounded"
    >
      <div className="relative border-b border-prim py-5 text-center bg-orange-l6 dark:bg-blue-d7">
        <span className="font-bold font-heading text-lg">Invest</span>
        <button
          onClick={closeModal}
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 border border-prim rounded p-2"
        >
          <Icon type="Close" size={26.5} />
        </button>
      </div>
      <div className="mx-8 p-4 border border-prim rounded my-6 bg-white dark:bg-blue-d7">
        <h4 className="text-xl font-bold mb-2">{name}</h4>
        <p className="text-gray-d1 dark:text-gray text-sm mb-4">
          {description}
        </p>
        <KeyValue
          title="Risk rating"
          tooltip="lorem ipsum"
          value={rating}
          classes="border-b border-prim"
        />
        <KeyValue title="Accepted Currency" value="USDC" />
      </div>
      <AccountOptions balances={accountBalances} classes="mx-8 mb-6" />
      <TokenField<FV, "token">
        name="token"
        tokens={getValues("tokens")}
        label="Enter the amount to invest:"
        scale={[10, 20, 50, 100, 250]}
        classes={{
          container: "px-8 mt-6",
          label: "font-heading text-base mb-2",
          inputContainer: "bg-white dark:bg-blue-d7",
        }}
        disabled={!!error}
        withMininum
      />

      {error && <Tooltip tooltip={error} classes="mx-8" />}
      <div className="mt-8 px-8 py-4 gap-x-3 border-t border-prim flex justify-end">
        <button
          onClick={closeModal}
          type="button"
          className="text-sm min-w-[8rem] py-2 btn-outline-filled"
        >
          Cancel
        </button>
        <button
          disabled={!!error}
          type="submit"
          className="text-sm min-w-[8rem] py-2 btn-orange disabled:bg-gray-l1"
        >
          Continue
        </button>
      </div>
    </Modal>
  );
}

type KVProps = {
  classes?: string;
  title: string;
  value: string;
  tooltip?: string;
};
function KeyValue({ title, value, tooltip, classes = "" }: KVProps) {
  return (
    <div className={`flex justify-between py-3 items-center ${classes}`}>
      <span className="text-gray-d1 dark:text-gray">
        {title}{" "}
        {tooltip && <Icon type="Question" className="relative inline" />}
      </span>
      <span className="font-semibold text-[0.9375rem]">{value}</span>
    </div>
  );
}
