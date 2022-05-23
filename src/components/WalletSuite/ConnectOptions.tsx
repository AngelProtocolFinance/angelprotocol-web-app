import ModalContext from "contexts/ModalContext";
import Backdrop from "components/Backdrop";
import Icon from "components/Icon";
import BnbConnector from "./Connectors/BnbConnector";
import EthConnector from "./Connectors/EthConnector";

export default function ConnectOptions(props: { closeHandler: () => void }) {
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
          <EthConnector />
          <BnbConnector />
        </ModalContext>
      </div>
    </>
  );
}
