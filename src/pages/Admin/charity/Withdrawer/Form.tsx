import Icon from "components/Icon";
import Amounts from "./Amounts";
import Beneficiary from "./Beneficiary";
import Network from "./Network";
import useWithdraw from "./useWithdraw";

export default function Form() {
  const { withdraw, isSubmitDisabled } = useWithdraw();

  return (
    <form
      onSubmit={withdraw}
      autoComplete="off"
      className="bg-white-grey grid p-4 pt-0 mt-4 rounded-md"
      noValidate
    >
      <Amounts />
      <Network />
      <Beneficiary />

      <div className="grid grid-cols-[auto_1fr] items-center gap-1 bg-yellow-400/20 p-2 rounded-md text-angel-grey mb-2">
        <Icon type="Warning" />
        <span className="font-mono text-xs ml-1">
          We recommend not using crypto exchange addresses for withdrawals. We
          are not responsible for the loss of funds.
        </span>
      </div>

      <button
        type="submit"
        className="w-full py-2 uppercase hover:bg-blue-accent bg-angel-blue rounded-lg text-white-grey text-sm font-bold disabled:bg-grey-accent mt-4"
        disabled={isSubmitDisabled}
      >
        {"Create withdraw proposal"}
      </button>
    </form>
  );
}
