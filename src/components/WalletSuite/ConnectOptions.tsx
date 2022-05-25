import { Connection } from "contexts/WalletContext/types";
import ModalContext from "contexts/ModalContext";
import { useSetWallet } from "contexts/WalletContext/WalletContext";
import Backdrop from "components/Backdrop";
import Icon from "components/Icon";

export default function ConnectOptions(props: { closeHandler: () => void }) {
  const { connections } = useSetWallet();
  return (
    <>
      <Backdrop
        customCloseHandler={props.closeHandler}
        classes="z-10 fixed inset-0"
      />
      <div className="w-max absolute top-full right-0 flex flex-col gap-3 bg-white p-4 pt-4 mt-2 rounded-md shadow-2xl z-50">
        <p className="uppercase font-heading text-angel-grey font-bold">
          Choose wallet
        </p>
        <button className="absolute top-2 right-2" onClick={props.closeHandler}>
          <Icon type="Close" className="text-white-grey text-lg" />
        </button>
        <ModalContext backdropClasses="absolute bg-black/50 inset-0 z-10">
          {connections.map((connection) => (
            <Connector key={connection.name} {...connection} />
          ))}
        </ModalContext>
      </div>
    </>
  );
}

function Connector(props: Connection) {
  return (
    <button
      onClick={props.connect}
      className="transform active:translate-x-1 bg-thin-blue disabled:bg-grey-accent text-angel-grey hover:bg-angel-blue hover:text-white flex items-center gap-2 rounded-full items-center p-1 pr-4 shadow-md"
    >
      <img
        src={props.logo}
        className="w-8 h-8 p-1.5 bg-white-grey rounded-full shadow-md"
        alt=""
      />
      <p className="uppercase text-sm text-white">{props.name}</p>
    </button>
  );
}
