type Base = { message: string; report?: string };
type Tx = { hash: string; chainId: string };

export type TxError = Base & {
  type: "tx";
  tx?: Tx;
};

export type GenericError = Base & {
  type: "generic";
  tx?: never;
};

export type APError = TxError | GenericError;
