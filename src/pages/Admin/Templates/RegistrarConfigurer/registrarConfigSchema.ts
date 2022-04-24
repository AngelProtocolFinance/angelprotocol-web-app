import * as Yup from "yup";
import { SchemaShape } from "types/schema";
import { RegistrarConfigPayload } from "types/server/contracts";
import { percentString, positiveNumber } from "schemas/number";
import { address } from "schemas/string";
import { ProposalBase, proposalShape } from "../proposalShape";

export type RegistrarConfigValues = ProposalBase &
  RegistrarConfigPayload & { initialConfigPayload: RegistrarConfigPayload };

const contractAddrSchema = address("contract").nullable();

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
  treasury: contractAddrSchema,
  guardians_multisig_addr: contractAddrSchema,
  endowment_owners_group_addr: contractAddrSchema,
  halo_token: contractAddrSchema,
  gov_contract: contractAddrSchema,
  charity_shares_contract: contractAddrSchema,
};

export const registrarConfigSchema = Yup.object(registrarConfigShape);
