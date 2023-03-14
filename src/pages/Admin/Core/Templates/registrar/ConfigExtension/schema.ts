import * as Yup from "yup";
import { RegistrarConfigExtensionValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { positiveNumber } from "schemas/number";
import { contractAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

const shape: SchemaShape<RegistrarConfigExtensionValues> = {
  ...proposalShape,

  accounts_contract: contractAddr,
  accounts_settings_controller: contractAddr,
  applications_review: contractAddr,
  charity_shares_contract: contractAddr,
  collector_addr: contractAddr,
  donation_match_charites_contract: contractAddr,
  fundraising_contract: contractAddr,
  gov_contract: contractAddr,
  halo_token_lp_contract: contractAddr,
  halo_token: contractAddr,
  index_fund_contract: contractAddr,
  swap_factory: contractAddr,
  swaps_router: contractAddr,

  //wasm codes
  cw3_code: positiveNumber,
  cw4_code: positiveNumber,
  subdao_bonding_token_code: positiveNumber,
  subdao_cw20_token_code: positiveNumber,
  subdao_cw900_code: positiveNumber,
  subdao_distributor_code: positiveNumber,
  subdao_gov_code: positiveNumber,
};

export const schema = Yup.object(shape);
