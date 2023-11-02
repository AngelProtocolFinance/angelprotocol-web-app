import { chainIds } from "constants/chainIds";
import { EMAIL_SUPPORT, EXPECTED_NETWORK_TYPE } from "constants/env";

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

export class LogDonationFail extends Error {
  chainId: string;
  txHash: string;
  constructor(chainId: string, txHash: string) {
    super(
      `Failed to log your donation for receipt purposes. Kindly send an email to ${EMAIL_SUPPORT}`
    );
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

export class WrongNetworkError extends APError {
  constructor() {
    super(
      "WrongNetworkError",
      `Please connect to ${EXPECTED_NETWORK_TYPE} network and reload the page.`
    );
  }
}

export class UnsupportedChainError extends APError {
  constructor(unsupportedChainId: string) {
    super(
      "UnsupportedChainError",
      `The chain you are connected to (ID: ${unsupportedChainId}) is not supported. Valid networks are ${EXPECTED_NETWORK_TYPE} ones on: Juno (${chainIds.juno}), Polygon (${chainIds.polygon}), Terra (${chainIds.terra}), Binance (${chainIds.binance}) and Ethereum (${chainIds.ethereum}). Please switch to one of those and reload the page.`
    );
  }
}

export class ManualChainSwitchRequiredError extends APError {
  constructor(chainId: string) {
    super(
      "ManualChainSwitchRequiredError",
      `Please use your wallet to switch to ${chainId} chain and reload the page`
    );
  }
}

export class WalletError extends APError {
  //based on EIP1193 error spec
  code: number;
  data?: unknown;
  constructor(message: string, code: number, data?: unknown) {
    super("WalletError", message);
    this.code = code;
    this.data = data;
  }
}
