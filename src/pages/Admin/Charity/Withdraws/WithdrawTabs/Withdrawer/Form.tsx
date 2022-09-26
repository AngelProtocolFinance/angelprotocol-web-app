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

      <div className="bg-amber-50 p-2 rounded-md text-amber-600 mb-2 text-sm">
        <Icon type="Info" className="inline relative bottom-0.5 mr-1" />
        We recommend not using crypto exchange addresses for withdrawals. We are
        not responsible for the loss of funds.
      </div>
      <Submit />
    </form>
  );
}
