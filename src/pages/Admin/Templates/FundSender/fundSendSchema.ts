import * as Yup from "yup";
import { FundSendValues } from "@types-page/admin";
import { SchemaShape } from "@types-schema";
import { requiredTokenAmount } from "schemas/number";
import { requiredAddress } from "schemas/string";
import { proposalShape } from "../proposalShape";

export type FundSendPayload = {
  amount: number;
  recipient: string;

  //metadata
  currency: "uusd" | "halo";
  haloBalance: number;
  ustBalance: number;
};

const fundSendShape: SchemaShape<FundSendValues> = {
  ...proposalShape,
  amount: requiredTokenAmount,
  recipient: requiredAddress("recipient"),
};

export const fundSendSchema = Yup.object(fundSendShape);
