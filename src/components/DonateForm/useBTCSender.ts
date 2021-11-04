import { useWallet } from "use-wallet";

export default function useBTCSender() {
  const wallet = useWallet();
  async function sender() {}
  return sender;
}
