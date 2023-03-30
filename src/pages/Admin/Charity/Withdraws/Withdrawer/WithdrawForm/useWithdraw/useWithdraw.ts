import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "../types";
import { chainIds } from "constants/chainIds";
import useJunoEndowWithdraw from "./useJunoEndowWithdraw";
import usePolygonEndowWithdraw from "./usePolygonEndowWithdraw";

const endow_chain = chainIds.juno;

export default function useWithdraw() {
  const { handleSubmit } = useFormContext<WithdrawValues>();

  const polygonEndowWithdraw = usePolygonEndowWithdraw();
  const junoEndowWithdraw = useJunoEndowWithdraw();

  //NOTE: submit is disabled on Normal endowments with unmatured accounts
  function withdraw(data: WithdrawValues) {
    return endow_chain === chainIds.polygon
      ? polygonEndowWithdraw(data)
      : junoEndowWithdraw(data);
  }

  return handleSubmit(withdraw);
}
