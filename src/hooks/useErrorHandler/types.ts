export type TxError = {
  type: "tx";
  message: string;
  tx?: {
    hash: string;
    chainId: string;
  };
};

export type AWSError = {
  type: "aws";
  message: string;
  tx?: never;
};

export type APError = TxError | AWSError | string;
