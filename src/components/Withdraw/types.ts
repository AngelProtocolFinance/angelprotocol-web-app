import { ReactNode } from "react";

export interface Values {
  withdraw: string;
  withdrawAmount?: number;
  receiver?: string;
  total?: number;
  liquidCW20Tokens?: number;
  liquidCW20TokenValue?: number;
  anchorVault?: string;
}

interface WithdrawProps {
  receiver: string;
  children: ReactNode;
}

export type Props = WithdrawProps;
