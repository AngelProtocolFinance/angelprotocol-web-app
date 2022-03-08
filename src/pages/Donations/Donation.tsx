import { RouteComponentProps } from "react-router-dom";
import { RouteParam } from "./types";
import DonationList from "./DonationList";

export default function Donation(props: RouteComponentProps<RouteParam>) {
  const address = props.match.params.address;

  return (
    <div className="grid grid-cols-2 gap-4 content-start padded-container justify-center">
      <h1 className="text-2xl font-bold uppercase flex items-center justify-start text-white">
        My Donations
      </h1>
      <DonationList address={address} />
    </div>
  );
}
