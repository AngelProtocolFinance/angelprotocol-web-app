import { BalanceData } from "contracts/types";

export type EndowmentBalanceData = BalanceData & { overall: number };

export type CharityParam = { address: string };
