import { NewAIF } from "types/contracts/evm";
import { SimulContractTx, TxLog } from "types/evm";
import { WalletState } from "contexts/WalletContext";
import Contract from "../Contract";
import abi from "./abi.json";

/**
 * By creating an event template constant and creating a type from it we enable the following:
 *   1. The parent's event decoder (decodeEventInternal) knows how to populate the expected event arguments
 *   2. The parent's event decoder can preserve type-safety
 *   3. The Account can create a wrapper around the parent's event decoder to ensure only expected events can be decoded
 *      using its (Account's) `decodeEvent` method
 *
 * IMPORTANT: it is crucial to have event arguments in the same order as they appear in the event from the logs.
 */
const eventTemplates = {
  EndowmentCreated: {
    endowId: 0,
  },
} as const;

type Events = typeof eventTemplates;

/**
 * Representation of the `Account` contract that extends and wraps the generic `Contract` functionality.
 * Ensures that `Contract` methods are called with the Account ABI.
 */
export default class Account extends Contract {
  /**
   * Passes the Account ABI to the parent `Contract` class, ensuring its methods are called with that ABI.
   *
   * @param contractAddress Address of the contract.
   * @param wallet The connected wallet.
   */
  constructor(contractAddress: string, wallet: WalletState) {
    super(abi, contractAddress, wallet);
  }

  /**
   * Wrapper around the parent's event decoder that ensures only expected events are decoded for this contract.
   *
   * @param event Name of the event to be decoded.
   * @param logs Transaction logs.
   * @returns The specified event's arguments if it was found (if it was emitted). Otherwise returns `null`.
   * @see {@link Events}
   */
  static decodeEvent = <K extends Extract<keyof Events, string>>(
    event: K,
    logs: TxLog[]
  ): Events[K] | null => {
    return super.decodeEventInternal(abi, eventTemplates[event], event, logs);
  };

  /**
   *
   * @param aif New AIF to create.
   * @returns An object containing transaction data necessary to call an EVM contract, see {@link SimulContractTx}
   */
  createCreateEndowmentTx(aif: NewAIF): SimulContractTx {
    return super.createContractTx("createEndowment", { aif });
  }
}
