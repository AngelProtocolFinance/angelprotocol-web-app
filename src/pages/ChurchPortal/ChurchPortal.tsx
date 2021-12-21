import { RouteComponentProps } from "react-router-dom";
import DappHead from "components/Headers/DappHead";
import Donater from "components/Donater/Donater";
import DonateSuite from "components/TransactionSuite/DonateSuite";

export type ChurchPortalParam = { address: string };

const ChurchPortal = (props: RouteComponentProps<ChurchPortalParam>) => {
  const endowment_addr = props.match.params.address;
  return (
    <div className="grid grid-rows-a1 place-items-center pt-2">
      <DappHead />
      <h2 className="text-2xl font-bold text-white mt-20 m-5">
        Church Endowment Donation Portal
      </h2>
      <p className="text-white pb-10">
        <span className="font-semibold">Donation Address: </span>
        {endowment_addr || "N/A"}
      </p>
      <Donater to="charity" receiver={endowment_addr} min_liq={0} max_liq={0}>
        <DonateSuite />
      </Donater>
    </div>
  );
};

export default ChurchPortal;
