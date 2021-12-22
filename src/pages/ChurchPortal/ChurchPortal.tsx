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
      <Donater to="charity" receiver={endowment_addr} max_liq={0}>
        <DonateSuite />
      </Donater>
      <p className="p-5 p-10 text-white font-light text-md">
        If you would like a tax receipt issued please email{" "}
        <a className="text-angel-blue" href="mailto:support@angelprotocol.io">
          support@angelprotocol.io
        </a>{" "}
        with the following information:
        <ul>
          <li>Your name</li>
          <li>Your address</li>
          <li>
            The link to your donation transaction (found in the final window
            after donating)
          </li>
        </ul>
      </p>
    </div>
  );
};

export default ChurchPortal;
