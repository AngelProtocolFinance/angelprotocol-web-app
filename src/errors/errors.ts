import { EXPECTED_NETWORK_TYPE } from "constants/env";

export abstract class APError extends Error {
  dismissable: boolean;
  constructor(name: string, message: string, dismissable = true) {
    super(message);
    this.name = name;
    this.dismissable = dismissable;
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

export class WrongChainError extends Error {
  constructor(expectedChain?: string) {
    super(
      `Connected to the wrong chain.${
        !expectedChain ? "" : ` Please connect to the ${expectedChain} chain.`
      }`
    );
    this.name = "WrongChainError";
  }
}

export class WrongNetworkError extends APError {
  dismissable: boolean;
  constructor(dismissable = true) {
    super(
      "WrongNetworkError",
      `Please connect to ${EXPECTED_NETWORK_TYPE} network and reload the page.`,
      dismissable
    );
    this.dismissable = dismissable;
  }
}

export class UnsupportedNetworkError extends Error {
  constructor(unsupportedChainId: string) {
    super(
      `Network ${unsupportedChainId} not supported. The only supported networks are on: Juno, Terra, Ethereum and Binance`
    );
    this.name = "UnsupportedNetworkError";
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
