import Amounts from "./Amounts";
import Beneficiary from "./Beneficiary";
import Network from "./Network";
import Submit from "./Submit";
import Warning from "./Warning";
import useWithdraw from "./useWithdraw";

export default function Form() {
  const { withdraw } = useWithdraw();

  return (
    <form
      onSubmit={withdraw}
      autoComplete="off"
      className="flex flex-col items-center gap-6 w-full"
      noValidate
    >
      <Amounts />
      <Network />
      <Beneficiary classes="mt-6 mb-2" />
      <Warning classes="mt-4 mb-2">
        All withdraws to Ethereum & Binance are processed on a hourly basis by
        our cross-chain pipelines.
      </Warning>
      <Warning classes="mb-2">
        The minimum withdrawal for Ethereum & Binance is $20 USDC.
      </Warning>
      <Warning classes="mb-2">
        We recommend not using crypto exchange addresses for withdrawals. We are
        not responsible for the loss of funds.
      </Warning>
      <Submit />
    </form>
  );
}
