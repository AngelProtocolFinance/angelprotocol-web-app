import Copier from "components/Copier/Copier";
import { Addr } from "components/Copier/types";
import maskAddress from "helpers/maskAddress";

export default function Address({ address }: { address: string }) {
  return (
    <div className="flex gap-2 items-center p-2  pb-0">
      <p className="text-xl text-angel-grey">{maskAddress(address)}</p>
      <Copier text={address as Addr} colorClass="text-angel-grey text-lg" />
    </div>
  );
}
