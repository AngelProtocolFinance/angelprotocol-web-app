type TxError = {
  type: "tx";
  message: string;
  tx?: {
    hash: string;
    chainId: string;
  };
};

type AWSError = {
  type: "aws";
  message: string;
  tx?: never;
};

export type APError = TxError | AWSError | string;
