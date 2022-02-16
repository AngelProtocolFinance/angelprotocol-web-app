import { RouteComponentProps } from "react-router-dom";
import Donater from "components/Transactors/Donater/Donater";
import { Props as C } from "components/Transactors/Donater/types";
import TransactionSuite from "components/TransactionSuite/TransactionSuite";
import DonateForm from "components/Transactors/Donater/DonateForm/DonateForm";

export type ChurchPortalParam = { address: string };

const ChurchPortal = (props: RouteComponentProps<ChurchPortalParam>) => {
  const endowment_addr = props.match.params.address;
  return (
    <div className="grid place-items-center pt-2">
      <h2 className="text-2xl font-bold text-white mt-20 m-5">
        Church Endowment Donation Portal
      </h2>
      <p className="text-white pb-10">
        <span className="font-semibold">Donation Address: </span>
        {endowment_addr || "N/A"}
      </p>
      <TransactionSuite<C>
        Context={Donater}
        contextProps={{
          to: "charity",
          receiver: endowment_addr,
          max_liq: 0,
          Form: DonateForm,
        }}
      />
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
