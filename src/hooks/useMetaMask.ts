import { useGetter } from "store/accessors";

/*
 * useWallet-esque hook for MetaMask only.
 * Exports only Connector Related States.
 */
const useMetaMask = () => {
  const { connected, network } = useGetter((state) => state.metamask);

  return { connected, network };
};

export default useMetaMask;
