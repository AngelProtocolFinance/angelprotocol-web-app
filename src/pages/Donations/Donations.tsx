import { useParams } from "react-router-dom";
import DonationList from "./DonationList";

export type UserAddrParam = { address: string };
export default function Donations() {
  const { address } = useParams<UserAddrParam>();

  return (
    <div className="grid grid-cols-2 gap-4 content-start padded-container justify-center">
      <h1 className="text-2xl font-bold uppercase flex items-center justify-start text-white">
        My Donations
      </h1>
      <DonationList userAddress={address} />
    </div>
  );
}
