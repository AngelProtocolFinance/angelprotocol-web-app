import { useConnectedWallet } from "@terra-money/wallet-provider";
import Halo from "contracts/Halo";
import { useMemo } from "react";
import { useGovStakerQuery } from "services/terra/terra";
import { GovStaker } from "services/terra/types";

//just a wrapper to this query
export default function useGovStaker() {
  const wallet = useConnectedWallet();
  const contract = useMemo(() => new Halo(wallet), [wallet]);
  const { data: gov_staker = staker_placeholder } = useGovStakerQuery(
    {
      address: contract.gov_address,
      msg: { staker: { address: wallet?.walletAddress } },
    },
    { skip: wallet === undefined }
  );

  return gov_staker;
}

const staker_placeholder: GovStaker = {
  balance: "0",
  share: "0",
  locked_balance: [],
};
