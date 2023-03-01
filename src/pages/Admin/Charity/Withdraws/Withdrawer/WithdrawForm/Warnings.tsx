import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { APP_NAME } from "constants/common";
import Warning from "./Warning";

export default function Warnings() {
  const { watch } = useFormContext<WithdrawValues>();

  const type = watch("type");

  return (
    <div className="flex flex-col gap-3 w-full">
      <Warning>
        All withdraws to Ethereum & Binance are processed on a hourly basis by
        our cross-chain pipelines.
      </Warning>
      {/* <Warning>
        The minimum withdrawal for Ethereum & Binance is $20 USDC.
      </Warning> */}
      <Warning>
        We recommend not using crypto exchange addresses for withdrawals. We are
        not responsible for the loss of funds.
      </Warning>
      {type === "locked" && (
        <Warning>
          {`Withdrawing from endowment funds requires ${APP_NAME} team approval.`}
        </Warning>
      )}
    </div>
  );
}
