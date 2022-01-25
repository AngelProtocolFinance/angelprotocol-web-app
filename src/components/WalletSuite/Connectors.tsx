import { IoClose } from "react-icons/io5";
import { useWallet } from "@terra-money/wallet-provider";
import Backdrop from "./Backdrop";
import Nodal from "components/Nodal/Nodal";
import TerraAction from "components/TerraStation/TerraAction";

type Props = {
  closeHandler: () => void;
};

export default function Connectors(props: Props) {
  const { availableConnections } = useWallet();
  return (
    <>
      <div className="w-72 absolute top-full right-0 flex flex-col gap-4 bg-white p-4 pt-4 mt-2 rounded-md shadow-2xl z-50">
        <p className="uppercase font-heading text-angel-grey font-bold">
          Choose wallet
        </p>
        <button className="absolute top-2 right-2" onClick={props.closeHandler}>
          <IoClose className="text-white-grey text-lg" />
        </button>
        <Nodal classes="absolute bg-white bg-opacity-95 rounded-md right-0 left-0 bottom-0 top-0 z-10 grid place-items-center">
          {availableConnections.map((connection) => {
            return <TerraAction key={connection.name} {...connection} />;
          })}
        </Nodal>
      </div>
      <Backdrop closeHandler={props.closeHandler} />
    </>
  );
}
