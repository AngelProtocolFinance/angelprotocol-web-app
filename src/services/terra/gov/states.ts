<<<<<<< HEAD
import Gov, { G, TG } from "contracts/Gov";
import { chainIDs } from "constants/chainIDs";
=======
import Halo, { H, T } from "contracts/Halo";
>>>>>>> master
import { useContract } from "../useContract";
import { gov_api } from "./gov";
import { staker } from "./placeholders";

export function useGovStakerState() {
  const { contract, wallet } = useContract<G, TG>(Gov);
  const { data = staker } = gov_api.endpoints.govStaker.useQueryState(
    contract.staker,
    {
<<<<<<< HEAD
      skip:
        wallet === undefined || wallet.network.chainID === chainIDs.terra_local,
    }
  );
  return data;
}

export function useGovHaloBalance() {
  const { wallet, contract } = useContract<G, TG>(Gov);
  const { data = 0 } = gov_api.endpoints.govHaloBalance.useQueryState(
    contract.haloBalance,
    {
      skip: wallet && wallet.network.chainID === chainIDs.terra_local,
=======
      skip: wallet === undefined,
>>>>>>> master
    }
  );
  return data;
}
