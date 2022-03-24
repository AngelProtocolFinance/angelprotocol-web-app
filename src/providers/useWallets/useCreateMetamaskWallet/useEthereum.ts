import { useCallback, useEffect, useState } from "react";
import { DeviceType, deviceType } from "../../../helpers/deviceType";
import { Dwindow } from "../../../services/provider/types";
import {
  AccountChangeHandler,
  EIP1193Events,
  EIP1193Methods,
  Ethereum,
} from "./types";

export default function useEthereum() {
  //connect only if there's no active wallet
  const lastAction = retrieveUserAction();

  const shouldReconnect = lastAction === "connect";
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  //useful when user changes account internally via metamask
  const handleAccountsChange: AccountChangeHandler = useCallback(
    (accounts) => {
      //requestAccounts(new connection) will set the address so no need to set again
      if (accounts.length > 0 && !address) {
        setAddress(accounts[0]);
        //if no account is found, means user disconnected
      } else {
        getEthereum()?.removeListener(
          EIP1193Events.accountsChanged,
          handleAccountsChange
        );
        setConnected(false);
        saveUserAction("disconnect");
      }
    },
    [address]
  );

  const detachAccountChangeHandler = useCallback(() => {
    getEthereum()?.removeListener(
      EIP1193Events.accountsChanged,
      handleAccountsChange
    );
  }, [handleAccountsChange]);

  useEffect(() => {
    if (deviceType() === DeviceType.MOBILE && (window as Dwindow).ethereum) {
      setConnected(true);
      setLoading(false);
      return;
    }

    requestAccess();
    return () => {
      detachAccountChangeHandler();
    };
    //eslint-disable-next-line
  }, []);

  const requestAccess = useCallback(
    async (isNewConnection = false) => {
      const ethereum = getEthereum();
      if (ethereum && (isNewConnection || shouldReconnect) && !connected) {
        ethereum.on(EIP1193Events.accountsChanged, handleAccountsChange);
        const { result: accounts = [] } = await ethereum.send(
          EIP1193Methods.eth_requestAccounts,
          []
        );

        setConnected(true);
        setAddress(accounts[0]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    },
    [handleAccountsChange, shouldReconnect, connected]
  );

  const disconnect = useCallback(async () => {
    if (!connected) return;
    const ethereum = getEthereum();
    if (!ethereum) return;
    detachAccountChangeHandler();
    setConnected(false);
    saveUserAction("disconnect");
  }, [detachAccountChangeHandler, connected]);

  const connect = useCallback(async () => {
    try {
      setLoading(true);
      await requestAccess(true);
      saveUserAction("connect");
    } catch (err: any) {
      setLoading(false);
      //let caller handle error with UI
      if ("code" in err && err.code === 4001) {
        throw new RejectMetamaskLogin();
      } else {
        throw new Error("Uknown error occured");
      }
    }
  }, [requestAccess]);

  return {
    setters: { connect, disconnect },
    state: { loading, address, connected },
  };
}

const ActionKey = "ethereum_pref";

type Action = "connect" | "disconnect";

function saveUserAction(action: Action) {
  localStorage.setItem(ActionKey, action);
}

function retrieveUserAction(): Action {
  return (localStorage.getItem(ActionKey) as Action) || "disconnect";
}

export function getEthereum() {
  return (window as any).ethereum as Ethereum;
}

export class RejectMetamaskLogin extends Error {
  constructor() {
    super();
    this.message = "Metamask login cancelled";
    this.name = "RejectMetamaskLogin";
  }
}

//notes: 1 accountChange handler run only on first connect [] --> [something]
//and revocation of permission [something] --> []
