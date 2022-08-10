import { EXPECTED_NETWORK_TYPE } from "constants/env";

export const AP_ERROR_DISCRIMINATOR = "AP_ERROR_DISCRIMINATOR";

interface IAPError extends Error {
  discriminator: string;
}

export abstract class APError extends Error implements IAPError {
  discriminator: string;
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
    this.discriminator = AP_ERROR_DISCRIMINATOR;
  }

  toSerializable(): IAPError {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      cause: this.cause,
      discriminator: this.discriminator,
    };
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

export class WalletDisconnectedError extends APError {
  constructor() {
    super("WalletDisconnectedError", "Wallet is not connected");
  }
}

export class UnexpectedStateError extends APError {
  constructor(message = "App is in unexpected state") {
    super("UnexpectedStateError", message);
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
