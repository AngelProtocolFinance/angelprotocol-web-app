import * as Yup from "yup";
import { RegistrarConfigValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { percentString, positiveNumber } from "schemas/number";
import { address, contractAddr } from "schemas/string";
import { proposalShape } from "../proposalShape";

const contractAddrSchema = contractAddr("contract").nullable();

const registrarConfigShape: SchemaShape<RegistrarConfigValues> = {
  ...proposalShape,
  //accounts code id
  accounts_code_id: positiveNumber,

  //splits
  split_default: percentString,
  split_max: percentString,
  split_min: percentString,

  //vault settings
  tax_rate: percentString,
  default_vault: contractAddrSchema,

  //contracts
  index_fund_contract: contractAddrSchema,
  treasury: address("contract").nullable(),
  guardians_multisig_addr: contractAddrSchema,
  endowment_owners_group_addr: contractAddrSchema,
  halo_token: contractAddrSchema,
  gov_contract: contractAddrSchema,
  charity_shares_contract: contractAddrSchema,
};

export const registrarConfigSchema = Yup.object(registrarConfigShape);
