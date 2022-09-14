import Icon from "components/Icon";
import Amounts from "./Amounts";
import Beneficiary from "./Beneficiary";
import Network from "./Network";
import Submit from "./Submit";
import useWithdraw from "./useWithdraw";

export default function Form() {
  const { withdraw } = useWithdraw();

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
      <Submit />
    </form>
  );
}
