export class Disconnected extends Error {
  constructor() {
    super();
    this.name = "wallet disconnected";
  }
}

export class TxResultFail extends Error {
  chainId: string;
  txHash: string;
  constructor(chainId: string, txHash: string) {
    super();
    this.chainId = chainId;
    this.txHash = txHash;
    this.name = "TxResultFailt";
  }
}

export class LBPGraphDataUnavailable extends Error {
  // this field should be used for our internal logging
  reason: string;
  constructor(reason: string) {
    super();
    this.reason = reason;
    this.name = "LBPGraphDataUnavailable";
  }
}
