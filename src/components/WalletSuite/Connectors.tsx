import { IoClose } from "react-icons/io5";
import { useWallet, ConnectType } from "@terra-money/wallet-provider";
import Backdrop from "./Backdrop";
import Modal from "components/Modal/Modal";
import TerraAction from "./Terra/TerraAction";
import Installer from "./Installer";
import { useEffect, useState } from "react";
import MetaAction from "./MetaAction/MetaAction";

type Props = {
  closeHandler: () => void;
};

declare var window: any;

export default function Connectors(props: Props) {
  let { availableConnections, availableInstallations } = useWallet();

  let [multiChainConnections, setMultiChainConnections] = useState<any>([]);
  let [multiChainInstallations, setMultiChainInstallations] = useState<any>([]);

  useEffect(() => {
    if (!availableConnections || !availableInstallations) return;

    if (window.ethereum) {
      setMultiChainConnections([
        ...availableConnections,
        {
          name: "MetaMask",
          type: "ETHEREUM",
          icon: "/images/icons/metamask.png",
        },
      ]);
      setMultiChainInstallations([...availableInstallations]);
    } else {
      setMultiChainConnections([...availableConnections]);
      setMultiChainInstallations([
        ...availableInstallations,
        {
          name: "MetaMask",
          url: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
          icon: "/images/icons/metamask.png",
        },
      ]);
    }
  }, [availableConnections, availableInstallations]);

  return (
    <>
      <div className="w-72 absolute top-full right-0 flex flex-col gap-3 bg-white p-4 pt-4 mt-2 rounded-md shadow-2xl z-50">
        <p className="uppercase font-heading text-angel-grey font-bold">
          Choose wallet
        </p>
        <button className="absolute top-2 right-2" onClick={props.closeHandler}>
          <IoClose className="text-white-grey text-lg" />
        </button>
        <Modal classes="absolute bg-white bg-opacity-95 rounded-md right-0 left-0 bottom-0 top-0 z-10 grid place-items-center">
          {multiChainConnections
            .filter(
              (connection: any) => connection.type !== ConnectType.READONLY
            )
            .map((connection: any) => {
              if (connection.name === "MetaMask") {
                return <MetaAction key={connection.name} {...connection} />;
              } else {
                return <TerraAction key={connection.name} {...connection} />;
              }
            })}
        </Modal>
        <p className="uppercase font-heading text-angel-grey text-sm">
          supported wallets
        </p>
        <div className="flex gap-2">
          {multiChainInstallations.map((installer: any) => (
            <Installer
              key={installer.name}
              icon={installer.icon}
              link={installer.url}
            />
          ))}
        </div>
      </div>
      <Backdrop closeHandler={props.closeHandler} />
    </>
  );
}
