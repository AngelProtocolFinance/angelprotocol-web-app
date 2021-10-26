import { useWallet } from "use-wallet";

export default function useAction() {
  const wallet = useWallet();

  async function handleConnect() {
    await wallet.connect("injected");
    console.log("done");
  }

  return { handleConnect, connecting: wallet.status === "connecting" };
}
