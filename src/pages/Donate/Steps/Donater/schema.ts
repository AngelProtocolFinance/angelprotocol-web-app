import * as Yup from "yup";
import { DonateValues, TokenWithAmount } from "./types";
import { SchemaShape } from "schemas/types";
import { tokenConstraint } from "schemas/number";

const minKey: keyof TokenWithAmount = "min_donation_amnt";

const tokenShape: SchemaShape<TokenWithAmount> = {
  amount: tokenConstraint.when(
    minKey,
    (minAmount: TokenWithAmount["min_donation_amnt"], schema) =>
      !!minAmount
        ? schema
            .required("required")
            .min(minAmount, `amount must be greater than ${minAmount}`)
        : schema.required("required")
  ),
};

const shape: SchemaShape<DonateValues> = {
  token: Yup.object().shape(tokenShape),
  isAgreedToTerms: Yup.boolean().isTrue(),
};

export const schema = Yup.object().shape(shape);
