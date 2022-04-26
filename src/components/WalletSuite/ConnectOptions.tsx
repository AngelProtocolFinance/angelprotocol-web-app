import Icon from "components/Icons/Icons";
import Backdrop from "components/ModalContext/Backdrop";
import ModalContext from "components/ModalContext/ModalContext";
import useWalletContext from "hooks/useWalletContext";
import BnbConnector from "./Connectors/BnbConnector";
import EthConnector from "./Connectors/EthConnector";
import TerraConnector from "./Connectors/TerraConnector";
import Installer from "./Installer";

export default function ConnectOptions(props: { closeHandler: () => void }) {
  const { availableWallets, availableInstallations } = useWalletContext();

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
          {availableWallets
            .filter((wallet) => wallet.connection.type !== "READONLY")
            .map((availableWallet) => {
              return (
                <TerraConnector
                  key={availableWallet.connection.name}
                  wallet={availableWallet}
                />
              );
            })}
          <EthConnector />
          <BnbConnector />
        </ModalContext>
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
    </>
  );
}
