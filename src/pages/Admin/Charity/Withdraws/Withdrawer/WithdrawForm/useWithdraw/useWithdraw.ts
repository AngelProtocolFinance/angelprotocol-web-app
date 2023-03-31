import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "../types";
import usePolygonEndowWithdraw from "./usePolygonEndowWithdraw";

export default function useWithdraw() {
  const { handleSubmit } = useFormContext<WithdrawValues>();

  const polygonEndowWithdraw = usePolygonEndowWithdraw();

  //NOTE: submit is disabled on Normal endowments with unmatured accounts
  function withdraw(data: WithdrawValues) {
    return polygonEndowWithdraw(data);
  }

  return handleSubmit(withdraw);
}
