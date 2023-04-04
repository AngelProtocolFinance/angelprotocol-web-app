import { NewAIF } from "types/contracts/evm";
import { SimulContractTx, TxLog } from "types/evm";
import { WalletState } from "contexts/WalletContext";
import Contract from "../Contract";
import abi from "./abi.json";

// It is crucial to have event arguments in the same order as they appear in the event from the logs
const eventTemplates = {
  EndowmentCreated: {
    endowId: 0,
  },
} as const;

type Events = typeof eventTemplates;

export default class Account extends Contract {
  constructor(contractAddress: string, wallet: WalletState) {
    super(abi, contractAddress, wallet);
  }

  // we create a wrapper for the decodeEventInternal to ensure only expected events
  // can be decoded
  static decodeEvent = <K extends Extract<keyof Events, string>>(
    event: K,
    logs: TxLog[]
  ): Events[K] | null => {
    return super.decodeEventInternal(abi, eventTemplates, event, logs);
  };

  createCreateEndowmentTx(aif: NewAIF): SimulContractTx {
    return super.createContractTx("createEndowment", aif);
  }
}
