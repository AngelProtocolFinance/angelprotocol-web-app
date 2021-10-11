import { useWallet, ConnectType } from "@terra-money/wallet-provider";

type Props = {
  type: ConnectType;
};

export default function Connector(props: Props) {
  const { availableConnectTypes, connect } = useWallet();
  const isConnectible = availableConnectTypes.includes(props.type);
  const handleClick = () => connect(props.type);

  return (
    (isConnectible && (
      <button
        onClick={handleClick}
        className={`mt-4 uppercase text-xs bg-white bg-opacity-50 text-white px-3 py-1 rounded-full`}
      >
        Connect
      </button>
    )) ||
    null
  );
}
