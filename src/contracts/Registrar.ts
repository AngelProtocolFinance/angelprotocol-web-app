import { ContractQueryArgs as CQA } from "services/types";
import { Charity } from "types/server/aws";
import {
  EndowmentQueryOptions,
  RegistrarConfigPayload,
  RegistrarCreateEndowmentPayload,
  RegistrarOwnerPayload,
  StatusChangePayload,
} from "types/server/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class Registrar extends Contract {
  vaultsRate: CQA;
  config: CQA;

  endowmentList: (args: EndowmentQueryOptions) => CQA;

  constructor(wallet: WalletState | undefined) {
    const address = contracts.registrar;

    super(wallet, address);

    this.endowmentList = (queryOptions) => ({
      address: address,
      msg: {
        endowment_list: queryOptions,
      },
    });

    this.vaultsRate = {
      address: address,
      msg: {
        approved_vault_rate_list: {},
      },
    };

    this.config = {
      address: address,
      msg: { config: {} },
    };
  }

  createEmbeddedChangeEndowmentStatusMsg(payload: StatusChangePayload) {
    return this.createEmbeddedWasmMsg([], {
      update_endowment_status: payload,
    });
  }

  createEmbeddedConfigUpdateMsg(payload: RegistrarConfigPayload) {
    return this.createEmbeddedWasmMsg([], {
      update_config: payload,
    });
  }

  createEndowmentCreationMsg(charity: Charity) {
    return this.createExecuteContractMsg({
      create_endowment: createEndowmentCreationMsgPayload(charity),
    });
  }

  createEmbeddedOwnerUpdateMsg(payload: RegistrarOwnerPayload) {
    return this.createEmbeddedWasmMsg([], {
      update_owner: payload,
    });
  }
}
export interface R extends Registrar {}
export type T = typeof Registrar;

function createEndowmentCreationMsgPayload(
  charity: Charity
): RegistrarCreateEndowmentPayload {
  return {
    beneficiary: charity.Metadata.JunoWallet,
    cw4_members: [],
    guardians_multisig_addr: undefined,
    maturity_height: undefined,
    maturity_time: undefined,
    owner: charity.Metadata.JunoWallet,
    profile: {
      annual_revenue: undefined,
      average_annual_budget: undefined,
      charity_navigator_rating: undefined,
      contact_email: charity.ContactPerson.Email,
      country_of_origin: undefined,
      endow_type: "Charity",
      image: charity.Metadata.Banner.publicUrl!,
      logo: charity.Metadata.CharityLogo.publicUrl!,
      name: charity.Registration.CharityName,
      number_of_employees: undefined,
      overview: charity.Metadata.CharityOverview,
      registration_number: undefined,
      social_media_urls: {
        facebook: undefined,
        linkedin: undefined,
        twitter: undefined,
      },
      street_address: undefined,
      tier: charity.Registration.Tier!,
      un_sdg: charity.Registration.UN_SDG,
      url: charity.Registration.Website,
    },
    withdraw_before_maturity: false,
  };
}
