import { useEffect, useState } from "react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { DWindow } from "types/window";
import { chains } from "contracts/types";

enum events {
  connect = "connect",
  disconnect = "disconnect",
  load = "load",
}

const dwindow: DWindow = window;
export default function usePhantom() {
  //connect only if there's no active wallet
  const last_action = retrieve_action();
  const should_reconnect = last_action === "connect";
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState<number>(0);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const [present, phantom] = get_phantom();
    //for client-side page transition
    if (present) {
      attach_connect(phantom);
      attach_disconnect(phantom);
      if (should_reconnect) {
        phantom.connect({ onlyIfTrusted: true });
      }
    }

    //for page reload
    window.addEventListener("load", attach_controls);
    return () => {
      window.removeEventListener("load", attach_controls);
      reset_controls();
    };
    //eslint-disable-next-line
  }, []);

  const attach_controls = () => {
    const [present, phantom] = get_phantom();
    if (!present) return;
    attach_connect(phantom);
    attach_disconnect(phantom);
    if (should_reconnect) {
      phantom.connect({ onlyIfTrusted: true });
    }
  };

  const reset_controls = () => {
    const [present, phantom] = get_phantom();
    if (!present) return;
    detach_connect(phantom);
    detach_disconnect(phantom);
  };

  const attach_connect = (phantom: any) => {
    phantom.on(events.connect, onConnect);
  };
  const detach_connect = (phantom: any) => {
    phantom.removeListener(events.connect, onConnect);
  };
  const attach_disconnect = (phantom: any) => {
    phantom.on(events.disconnect, onDisconnect);
  };
  const detach_disconnect = (phantom: any) => {
    phantom.removeListener(events.disconnect, onDisconnect);
  };

  const onDisconnect = () => {
    setAddress("");
    setConnected(false);
    setBalance(0);
    //disconnect() triggers loading, this listener ends loading
    setLoading(false);
  };

  const onConnect = async (pub_key: PublicKey) => {
    const [, phantom] = get_phantom();
    const connection = new Connection(clusterApiUrl(chains.sol_dev));
    const lamports = await connection.getBalance(pub_key);
    setAddress(pub_key.toString());
    setProvider(phantom);
    setBalance(lamports);
    setConnected(true);
    save_action("connect");
    //connect() triggers loading, this listener ends loading
    setLoading(false);
  };

  async function disconnect() {
    if (!connected) return;
    setLoading(true);
    const [, phantom] = get_phantom();
    await phantom.disconnect();
    save_action("disconnect");
    setProvider(null);
  }

  async function connect() {
    try {
      if (connected) return;
      setLoading(true);
      const [present, phantom] = get_phantom();
      if (!present) {
        window.open("https://phantom.app/", "_blank", "noopener noreferrer");
        return;
      }
      await phantom.connect();
    } catch (err) {
      setLoading(false);
      console.error(err);
      // { code: 4001, message: 'User rejected the request.' }
    }
  }

  return {
    setters: { connect, disconnect },
    state: { loading, balance, address, connected, provider },
  };
}

const key = "phantom_pref";
type Action = "connect" | "disconnect";
function save_action(action: Action) {
  localStorage.setItem(key, action);
}

function retrieve_action(): Action {
  return (localStorage.getItem(key) as Action) || "disconnect";
}

export function get_phantom(): [boolean, any] {
  return [!!dwindow?.phantom?.solana, dwindow?.phantom?.solana];
}
