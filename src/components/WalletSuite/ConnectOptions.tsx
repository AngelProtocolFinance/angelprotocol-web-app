import Icon from "components/Icons/Icons";
import Modal from "components/Modal/Modal";
import useWalletContext from "hooks/useWalletContext";
import Backdrop from "./Backdrop";
import EthConnector from "./Connectors/EthConnector";
import TerraConnector from "./Connectors/TerraConnector";
import Installer from "./Installer";

export default function ConnectOptions(props: { closeHandler: () => void }) {
  const { availableWallets, availableInstallations, connect } =
    useWalletContext();

  return (
    <>
      <div className="w-max absolute top-full right-0 flex flex-col gap-3 bg-white p-4 pt-4 mt-2 rounded-md shadow-2xl z-50">
        <p className="uppercase font-heading text-angel-grey font-bold">
          Choose wallet
        </p>
        <button className="absolute top-2 right-2" onClick={props.closeHandler}>
          <Icon type="Close" className="text-white-grey text-lg" />
        </button>
        <Modal classes="absolute bg-white/95 rounded-md right-0 left-0 bottom-0 top-0 z-10 grid place-items-center">
          {availableWallets
            .filter((wallet) => wallet.connection.type !== "READONLY")
            .map((wallet) => {
              return (
                <TerraConnector
                  key={wallet.connection.name}
                  wallet={wallet}
                  connect={connect}
                />
              );
            })}
          <EthConnector />
        </Modal>
        {availableInstallations.length > 0 && (
          <>
            <p className="uppercase font-heading text-angel-grey text-sm">
              supported wallets
            </p>
            <div className="flex gap-2">
              {availableInstallations.map((installer) => (
                <Installer
                  key={installer.name}
                  icon={installer.icon}
                  link={installer.url}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Backdrop closeHandler={props.closeHandler} />
    </>
  );
}
