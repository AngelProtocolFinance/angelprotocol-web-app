import React from "react";
import {
  Installation,
  MultiConnection,
  SingleConnection,
} from "contexts/WalletContext/types";
import ModalContext, { useModalContext } from "contexts/ModalContext";
import { useSetWallet } from "contexts/WalletContext/WalletContext";
import Backdrop from "components/Backdrop";
import Icon from "components/Icon";
import { WalletError } from "errors/errors";
import WalletPrompt from "./WalletPrompt";

export default function ConnectOptions(props: { closeHandler: () => void }) {
  const { connections, installations } = useSetWallet();
  return (
    <>
      <Backdrop
        customCloseHandler={props.closeHandler}
        classes="z-10 fixed inset-0"
      />
      <div
        id="connect-options"
        className="w-max absolute top-full right-0 flex flex-col gap-3 bg-white p-4 pt-4 mt-2 rounded-md shadow-2xl z-50"
      >
        <p className="uppercase font-heading text-angel-grey font-bold">
          Choose wallet
        </p>
        <button className="absolute top-2 right-2" onClick={props.closeHandler}>
          <Icon type="Close" className="text-white-grey text-lg" />
        </button>
        <ModalContext backdropClasses="absolute bg-black/50 inset-0 z-10">
          {connections.map((connection) =>
            connection.connections ? (
              <NetworkSelectionOpener {...connection} key={connection.name} />
            ) : (
              <Connector {...connection} key={connection.name} />
            )
          )}
          {installations.length > 0 && (
            <>
              <p className="uppercase font-heading text-angel-grey text-sm -mb-2">
                supported wallets
              </p>
              <div className="flex gap-2">
                {installations.map((installer) => (
                  <Installer key={installer.url} {...installer} />
                ))}
              </div>
            </>
          )}
        </ModalContext>
      </div>
    </>
  );
}

function NetworkSelectionOpener(props: MultiConnection) {
  const { showModal } = useModalContext();
  function openSelection() {
    showModal(NetworkSelection, props, "root");
  }
  return (
    <Button onClick={openSelection}>
      <img
        src={props.logo}
        className="w-8 h-8 p-1.5 bg-white-grey rounded-full shadow-md"
        alt=""
      />
      <p className="uppercase text-sm text-white">{props.name}</p>
    </Button>
  );
}

function NetworkSelection(props: { connections: SingleConnection[] }) {
  const { closeModal } = useModalContext();
  return (
    <div className="fixed-center w-max h-max inset-0 flex flex-col gap-3 bg-white-grey rounded-md p-4 z-10">
      <p className="font-heading text-sm font-bold text-angel-grey">
        Choose network
      </p>
      <button className="absolute top-2 right-2" onClick={closeModal}>
        <Icon type="Close" className="text-white-grey text-lg" />
      </button>
      {props.connections.map((connection) => (
        <Connector key={connection.name} {...connection} />
      ))}
    </div>
  );
}

function Connector(props: SingleConnection) {
  const { showModal } = useModalContext();
  async function handleConnect() {
    try {
      await props.connect();
    } catch (_err: any) {
      let errorMsg: string;
      if (_err instanceof WalletError) {
        errorMsg = _err.message;
      } else {
        errorMsg = "Unknown error occured";
      }
      showModal(WalletPrompt, { message: errorMsg }, "connect-options");
    }
  }

  return (
    <Button onClick={handleConnect}>
      <img
        src={props.logo}
        className="w-8 h-8 object-contain p-1.5 bg-white-grey rounded-full shadow-md"
        alt=""
      />
      <p className="uppercase text-sm text-white">{props.name}</p>
    </Button>
  );
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="transform active:translate-x-1 bg-thin-blue disabled:bg-grey-accent text-angel-grey hover:bg-angel-blue hover:text-white flex items-center gap-2 rounded-full items-center p-1 pr-4 shadow-md"
    />
  );
}

export function Installer(props: Installation) {
  return (
    <a href={props.url} target="_blank" rel="noopenner noreferrer">
      <img src={props.logo} className="w-5 h-5" alt="" />
    </a>
  );
}
