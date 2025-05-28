export interface Signer {
  name: string;
  email: string;
  eid: string;
}

interface Weld {
  eid: string;
}

export interface DocumentGroup {
  eid: string;
}

export namespace EtchPacket {
  export interface Data {
    signers: Signer[];
    documentGroup: DocumentGroup;
  }
  export interface Complete {
    action: "etchPacketComplete";
    token: string;
    data: Data;
  }
}

export namespace Signer {
  /** https://www.useanvil.com/docs/api/webhooks/#signercomplete */
  export interface Complete {
    action: "signerComplete";
    token: string;
    /** present for signers  that are part of workflow */
    data: Signer & { weldData?: Weld };
  }
}

interface OtherPayload {
  action: "future";
  token: string;
  data: string;
}

export type WebhookPayload =
  | EtchPacket.Complete
  | Signer.Complete
  | OtherPayload;
