import { EVENT_TEMPLATES, Events, Functions, Queries } from "./types";
import { WalletState } from "contexts/WalletContext";
import { Contract } from "../Contract";
import abi from "./abi.json";
import { RESULT_DECODERS } from "./resultDecoders";

/**
 * Representation of the `Account` contract that extends and wraps the generic `Contract` functionality.
 * Ensures that `Contract` methods are called with the Account ABI.
 */
export class ERC20Contract extends Contract<Queries, Functions, Events> {
  /**
   * Passes the Account ABI to the parent `Contract` class, ensuring its methods are called with that ABI.
   *
   * @param wallet The connected wallet.
   */
  constructor(address: string, wallet?: WalletState) {
    super(abi, address, EVENT_TEMPLATES, RESULT_DECODERS, wallet);
  }
}
