import { useConnectedWallet } from "@terra-dev/use-wallet";
import AppHead from "components/Headers/AppHead";
import { chains } from "contracts/types";
import { useEndowmentsQuery } from "services/aws/endowments/endowments";
import CharityCard from "./CharityCard";

export default function Marketplace() {
  const wallet = useConnectedWallet();
  const isTest = wallet?.network.chainID === chains.testnet;
  const { data } = useEndowmentsQuery(isTest);
  return (
    <section className="pb-16 grid grid-rows-a1">
      <AppHead />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 content-start gap-8 padded-container my-8">
        {data?.map((endowment) => (
          <CharityCard key={endowment.address} {...endowment} />
        ))}
      </ul>
    </section>
  );
}
