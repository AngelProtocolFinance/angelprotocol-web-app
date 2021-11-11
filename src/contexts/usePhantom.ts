import { useState } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { DWindow } from "types/window";

const dwindow: DWindow = window;
export default function usePhantom() {
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [address, setAddress] = useState("");

  async function onDisconnect() {
    setAddress("");
    setConnected(false);
    setBalance(0);
  }

  async function disconnect() {
    if (!connected) return;
    setLoading(true);
    await dwindow.solana.disconnect();
    dwindow.solana.removeListener("disconnect", onDisconnect);
    setLoading(false);
  }

  async function connect() {
    try {
      if (connected) return;
      setLoading(true);
      if (!dwindow.solana?.isPhantom) {
        window.open("https://phantom.app/", "_blank", "noopener noreferrer");
        return;
      }

      const resp = await dwindow.solana.connect();
      const pub_key = resp.publicKey;

      const connection = new Connection(clusterApiUrl("devnet"));
      const lamports = await connection.getBalance(pub_key);

      setAddress(pub_key.toString());
      setBalance(lamports);
      setConnected(true);
      setLoading(false);
      dwindow.solana.on("disconnect", onDisconnect);
    } catch (err) {
      setLoading(false);
      console.log(err);
      // { code: 4001, message: 'User rejected the request.' }
    }
  }

  return {
    setters: { connect, disconnect },
    state: { loading, balance, address, connected },
  };
}
