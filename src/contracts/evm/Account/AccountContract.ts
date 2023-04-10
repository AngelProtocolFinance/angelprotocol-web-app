import {
  EVENT_TEMPLATES,
  Events,
  FunctionType,
  Functions,
  Queries,
} from "./types";
import { SimulContractTx, TxLog } from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { contractsEvm } from "constants/contracts";
import { Contract } from "../Contract";
import { abi } from "./abi";
import { RESULT_DECODERS } from "./resultDecoders";

/**
 * Representation of the `Account` contract that extends and wraps the generic `Contract` functionality.
 * Ensures that `Contract` methods are called with the Account ABI.
 */
export class AccountContract extends Contract {
  /**
   * Passes the Account ABI to the parent `Contract` class, ensuring its methods are called with that ABI.
   *
   * @param wallet The connected wallet.
   */
  constructor(wallet?: WalletState) {
    super(abi, contractsEvm.accounts.diamond, wallet);
  }

  /**
   *
   * @param aif New AIF to create.
   * @returns An object containing transaction data necessary to call an EVM contract, see {@link SimulContractTx}
   */
  createTx<T extends keyof Functions>(
    funcName: T,
    args: Functions[T]
  ): SimulContractTx {
    return super.createTxInternal(funcName, args);
  }

  /**
   * Wrapper around the parent's event decoder that ensures only expected events are decoded for this contract.
   *
   * @param event Name of the event to be decoded.
   * @param logs Transaction logs.
   * @returns The specified event's arguments if it was found (if it was emitted). Otherwise returns `null`.
   * @see {@link Events}
   */
  decodeEvent = <K extends Extract<keyof Events, string>>(
    event: K,
    logs: TxLog[]
  ): Events[K] | null => {
    return super.decodeEventInternal(abi, EVENT_TEMPLATES[event], event, logs);
  };

  encode<T extends keyof Functions>(funcName: T, args: Functions[T]): string {
    return super.encodeInternal(funcName, args);
  }

  /**
   * Omitted some checks and optimizations for simplicity.
   *
   * @param address Address for which to fetch token balances.
   * @param providerId Provider ID to use to query balances.
   * @returns A Promise of {@link Coin} which contains the balance and denomination of the coin for the specified address
   */
  query<T extends FunctionType>(
    funcName: T,
    args: Queries[T]["args"]
  ): Promise<Queries[T]["finalResult"]> {
    return super.queryInternal(funcName, args, RESULT_DECODERS[funcName]);
  }
}
