import { Coin } from "@cosmjs/proto-signing";
import { BigNumberish } from "@ethersproject/bignumber";
import { SimulContractTx } from "types/evm";
import { WalletState } from "contexts/WalletContext";
import { Contract, Query, ResultDecoder } from "../Contract";
import abi from "./abi.json";

type Queries = {
  balanceOf: Query<{ address: string }, Coin>;
};

type FunctionType = keyof Queries;

const RESULT_DECODERS: {
  [key in FunctionType]: ResultDecoder<Queries[key]["result"]>;
} = {
  balanceOf: (result, iface, contractAddress) => ({
    amount: (
      iface.decodeFunctionResult("balanceOf", result)[0] as BigNumberish
    ).toString(),
    denom: contractAddress,
  }),
};

/**
 * Representation of the `Account` contract that extends and wraps the generic `Contract` functionality.
 * Ensures that `Contract` methods are called with the Account ABI.
 */
export class ERC20 extends Contract {
  /**
   * Passes the Account ABI to the parent `Contract` class, ensuring its methods are called with that ABI.
   *
   * @param contractAddress Address of the contract.
   * @param wallet The connected wallet.
   */
  constructor(contractAddress: string, wallet?: WalletState) {
    super(abi, contractAddress, wallet);
  }

  /**
   * Omitted some checks and optimizations for simplicity.
   *
   * @param address Address for which to fetch token balances.
   * @param providerId Provider ID to use to query balances.
   * @returns A Promise of {@link Coin} which contains the balance and denomination of the coin for the specified address
   */
  async query<T extends FunctionType>(
    funcName: T,
    args: Queries[T]["args"]
  ): Promise<Queries[T]["result"]> {
    return super.queryInternal(funcName, args, RESULT_DECODERS[funcName]);
  }

  /**
   * Omitted some checks and optimizations for simplicity.
   *
   * @param to Target address to transfer to.
   * @param amount Amount to transfer.
   * @returns An object containing transaction data necessary to call an EVM contract, see {@link SimulContractTx}
   */
  createTransferTx(to: string, amount: string): SimulContractTx {
    return super.createContractTx("transfer", { to, amount });
  }
}
