import { EXPECTED_NETWORK_TYPE } from "constants/env";

export interface IAPError extends Error {
  type: "APError";
  dismissable: boolean;
}

export abstract class APError extends Error implements IAPError {
  dismissable: boolean;
  type: "APError";
  constructor(name: string, message: string, dismissable = true) {
    super(message);
    this.name = name;
    this.dismissable = dismissable;
    this.type = "APError";
  }
}

export class LogApplicationUpdateError extends Error {
  chainId: string;
  pollId: string;
  constructor(chainId: string, pollId: string) {
    super();
    this.chainId = chainId;
    this.pollId = pollId;
    this.name = "ApplicationReviewPollUpdateError";
  }
}

export class LogDonationFail extends Error {
  chainId: string;
  txHash: string;
  constructor(chainId: string, txHash: string) {
    super();
    this.chainId = chainId;
    this.txHash = txHash;
    this.name = "LogDonationFail";
  }
}

export class WalletDisconnectError extends Error {
  constructor() {
    super();
    this.name = "WalletDisconnectError";
  }
}

export class UnexpectedStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnexpectedStateError";
  }
}

export class WrongChainError extends APError {
  constructor(expectedChain?: string) {
    super(
      "WrongChainError",
      `Connected to the wrong chain.${
        !expectedChain
          ? ""
          : ` Please connect to the ${expectedChain} chain and reload the page.`
      }`
    );
  }
}

export class WrongNetworkError extends APError {
  constructor() {
    super(
      "WrongNetworkError",
      `Please connect to ${EXPECTED_NETWORK_TYPE} network and reload the page.`
    );
  }
}

export class UnsupportedNetworkError extends APError {
  constructor(unsupportedChainId: string) {
    super(
      "UnsupportedNetworkError",
      `Chain ID ${unsupportedChainId} not supported. The only supported networks are on: Juno, Terra, Ethereum and Binance and reload the page`
    );
  }
}

export class TxResultFail extends Error {
  chainId: string;
  txHash: string;
  constructor(
    chainId: string,
    txHash: string,
    height: number,
    code: number,
    rawLog?: string
  ) {
    super(
      `Error when broadcasting tx ${txHash} at height ${height}. Code: ${code}; Raw log: ${rawLog}`
    );
    this.chainId = chainId;
    this.txHash = txHash;
    this.name = "TxResultFailt";
  }
}

export class WalletError extends Error {
  //based on EIP1193 error spec
  code: number;
  data?: unknown;
  constructor(message: string, code: number, data?: unknown) {
    super(message);
    this.code = code;
    this.data = data;
  }
}
