import {
  Connection,
  Installation,
  useWallet,
} from "@terra-money/wallet-provider";

export default function TerraWalletSelection() {
  /** get directly from terra since, useSetWallet().connections are tailored for multinetwork use
   *  e.g xdefi has network selection for terra & evm-chains
   */
  const { availableConnections, availableInstallations } = useWallet();

  if (
    availableConnections.length < 1 /** including read-only */ &&
    availableInstallations.length <= 0
  ) {
    return null;
  }

  return (
    <div className="w-full max-w-sm">
      <p className="text-left font-heading uppercase mb-1">other wallets</p>
      <div className="grid gap-2">
        {availableConnections
          .filter((connection) => connection.type !== "READONLY")
          .map((connection) => (
            <Connector {...connection} />
          ))}
        {availableInstallations.map((installation) => (
          <Installer {...installation} />
        ))}
      </div>
    </div>
  );
}

function Connector({ type, identifier, name, icon }: Connection) {
  const { connect } = useWallet();
  function handleConnect() {
    connect(type, identifier);
  }

  return (
    <button
      onClick={handleConnect}
      className="flex items-center gap-2 bg-white-grey/30 p-2 rounded shadow-inner hover:bg-white/80 hover:text-angel-grey"
    >
      <img src={icon} alt="" className="w-6 h-6 object-contain" />
      <p className="text-sm">{name}</p>
    </button>
  );
}

function Installer({ url, icon, name }: Installation) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={url}
      className="flex items-center gap-2 bg-white-grey/30 p-2 rounded shadow-inner hover:bg-white/80 hover:text-angel-grey"
    >
      <img src={icon} alt="" className="w-6 h-6 object-contain" />
      <p className="text-sm">Install {name}</p>
    </a>
  );
}
