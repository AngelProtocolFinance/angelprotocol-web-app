import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { useEndowmentsQuery } from "services/aws/endowments/endowments";
import { Endowment } from "services/aws/endowments/types";

const placeholder: Endowment = {
  address: "",
  name: "",
  owner: "",
  description: "",
  url: "",
  icon: "",
  iconLight: false,
  tier: 2,
};

export default function useGetEndowmentDetails(address: string) {
  const wallet = useConnectedWallet();
  const isTest = wallet?.network.chainID === chainIDs.testnet;
  const { details = placeholder } = useEndowmentsQuery(isTest, {
    selectFromResult: ({ data }) => ({
      details: data?.find((end) => end.address === address),
    }),
  });
  return details;
}
