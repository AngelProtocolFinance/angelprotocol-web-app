import { Chain } from "types/server/aws";
import { chainIds } from "constants/chainIds";

export class LogApplicationUpdateError extends Error {
  chain: Chain;
  pollId: string;
  constructor(chain: Chain, pollId: string) {
    super();
    this.chain = chain;
    this.pollId = pollId;
    this.name = "ApplicationReviewPollUpdateError";
  }
}

export class LogDonationFail extends Error {
  chain: Chain;
  txHash: string;
  constructor(chain: Chain, txHash: string) {
    super();
    this.chain = chain;
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
  constructor(expectedChain: keyof typeof chainIds) {
    super(
      `Connected to the wrong chain. Please connect to the ${expectedChain} chain.`
    );
    this.name = "WrongChainError";
  }
}

export class UnsupportedNetworkError extends Error {
  constructor(chainId: string) {
    const networksStr = Object.keys(chainIds).join(", ");

    super(`${chainId} not supported. Supported networks: ${networksStr}`);
    this.name = "UnsupportedNetworkError";
  }
}

export class TxResultFail extends Error {
  chain: Chain;
  txHash: string;
  constructor(
    chain: Chain,
    txHash: string,
    height: number,
    code: number,
    rawLog?: string
  ) {
    super(
      `Error when broadcasting tx ${txHash} at height ${height}. Code: ${code}; Raw log: ${rawLog}`
    );
    this.chain = chain;
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
