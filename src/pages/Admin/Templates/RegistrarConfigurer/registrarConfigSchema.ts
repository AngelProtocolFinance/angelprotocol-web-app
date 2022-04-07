import { RegistrarConfigPayload } from "contracts/types";
import { address } from "schemas/string";
import { PartialRecord } from "types/types";
import * as Yup from "yup";
import Lazy from "yup/lib/Lazy";
import { ProposalBase, proposalShape } from "../proposalShape";

export type RegistrarConfigValues = ProposalBase &
  RegistrarConfigPayload & { initialConfigPayload: RegistrarConfigPayload };

const contractAddrSchema = address("contract").nullable();

const rateConstraint = Yup.number()
  .typeError("invalid: must be a number")
  .min(0, "invalid: less than 0")
  .max(100, "invalid: greater than 100");

//if value passed, cast back to string
const stringRateSchema = Yup.lazy((value) =>
  value === ""
    ? Yup.string()
    : rateConstraint.isValidSync(value)
    ? Yup.string()
    : rateConstraint
);

const numberSchema = Yup.lazy((value) =>
  value === ""
    ? Yup.string()
    : Yup.number()
        .typeError("invalid: must be a number")
        .positive("invalid: can't be negative")
);

const registrarConfigShape: PartialRecord<
  keyof RegistrarConfigValues,
  Yup.AnySchema | Lazy<Yup.AnySchema>
> = {
  ...proposalShape,
  //accounts code id
  accounts_code_id: numberSchema,

  //splits
  split_default: stringRateSchema,
  split_max: stringRateSchema,
  split_min: stringRateSchema,

  //vault settings
  tax_rate: stringRateSchema,
  default_vault: contractAddrSchema,

  //contracts
  index_fund_contract: contractAddrSchema,
  treasury: contractAddrSchema,
  guardians_multisig_addr: contractAddrSchema,
  endowment_owners_group_addr: contractAddrSchema,
  halo_token: contractAddrSchema,
  gov_contract: contractAddrSchema,
  charity_shares_contract: contractAddrSchema,
};

export const registrarConfigSchema = Yup.object(registrarConfigShape);
