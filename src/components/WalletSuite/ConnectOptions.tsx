import ModalContext, { useModalContext } from "contexts/ModalContext";
import { useSetWallet } from "contexts/WalletContext/WalletContext";
import { Connection } from "contexts/WalletContext/types";
import Backdrop from "components/Backdrop";
import Icon from "components/Icon";
import { EIP1193Error } from "errors/errors";
import WalletPrompt from "./WalletPrompt";

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
            <Connector {...connection} key={connection.name} />
          ))}
        </ModalContext>
      </div>
    </>
  );
}

function Connector(props: Connection) {
  const { showModal } = useModalContext();
  async function handleConnect() {
    try {
      await props.connect();
    } catch (_err: any) {
      let errorMsg: string;
      if (_err instanceof EIP1193Error) {
        errorMsg = _err.message;
      } else {
        errorMsg = "Unknown error occured";
      }
      showModal(WalletPrompt, { message: errorMsg });
    }
  }

  return (
    <button
      onClick={handleConnect}
      className="transform active:translate-x-1 bg-thin-blue disabled:bg-grey-accent text-angel-grey hover:bg-angel-blue hover:text-white flex items-center gap-2 rounded-full items-center p-1 pr-4 shadow-md"
    >
      <img
        src={props.logo}
        className="w-8 h-8 p-1.5 object-contain bg-white-grey rounded-full shadow-md"
        alt=""
      />
      <p className="uppercase text-sm text-white">{props.name}</p>
    </button>
  );
}
