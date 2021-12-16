export class Disconnected extends Error {
  constructor() {
    super();
    this.name = "wallet disconnected";
  }
}

export class TxResultFail extends Error {
  url: string;
  constructor(url: string) {
    super();
    this.url = url;
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
