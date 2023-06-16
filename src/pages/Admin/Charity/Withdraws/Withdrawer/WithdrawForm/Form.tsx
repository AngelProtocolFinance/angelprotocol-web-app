import Amounts from "./Amounts";
import Beneficiary from "./Beneficiary";
import Breakdown from "./Breakdown";
import Network from "./Network";
import Submit from "./Submit";
import Warning from "./Warning";
import useWithdraw from "./useWithdraw";

export default function Form({ classes = "" }) {
  const { withdraw, fee, network } = useWithdraw();

  return (
    <form
      onSubmit={withdraw}
      autoComplete="off"
      className={`${classes} flex flex-col gap-6 w-full`}
      noValidate
    >
      <Amounts />

      <Network />
      <Beneficiary />
      <Breakdown />

      {network !== "Polygon" && (
        <>
          <Warning>
            Withraws to {network} are processed on a hourly basis by our
            cross-chain pipelines.
          </Warning>
          <Warning classes="-mt-1 mb-2">
            The minimum withdrawal amount is {fee} USDC.
          </Warning>
        </>
      )}
      <Warning classes="-mt-3">
        We recommend not using crypto exchange addresses for withdrawals. We are
        not responsible for the loss of funds.
      </Warning>
      <Submit />
    </form>
  );
}
