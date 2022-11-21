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
      className="text-gray-d3 bg-white grid p-4 pt-0 mt-4 rounded-md"
      noValidate
    >
      <Amounts />
      <Network />
      <Beneficiary />
      <div className="bg-orange-l6 p-2 rounded-md text-orange-d2 mb-2 text-sm">
        <Icon type="Info" className="inline relative bottom-0.5 mr-1" />
        All withdraws to Ethereum{/* & Binance*/} are processed on a hourly
        basis by our cross-chain pipelines.
      </div>
      <div className="bg-orange-l6 p-2 rounded-md text-orange-d2 mb-2 text-sm">
        <Icon type="Info" className="inline relative bottom-0.5 mr-1" />
        We recommend not using crypto exchange addresses for withdrawals. We are
        not responsible for the loss of funds.
      </div>
      <Submit />
    </form>
  );
}
