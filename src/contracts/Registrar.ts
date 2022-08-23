import { Charity } from "types/server/aws";
import {
  RegistrarConfigPayload,
  RegistrarCreateEndowmentPayload,
  RegistrarOwnerPayload,
  StatusChangePayload,
} from "types/server/contracts";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class Registrar extends Contract {
  private static address = contracts.registrar;

  createEmbeddedChangeEndowmentStatusMsg(payload: StatusChangePayload) {
    return this.createEmbeddedWasmMsg(Registrar.address, {
      update_endowment_status: payload,
    });
  }

  createEmbeddedConfigUpdateMsg(payload: RegistrarConfigPayload) {
    return this.createEmbeddedWasmMsg(Registrar.address, {
      update_config: payload,
    });
  }

  createEndowmentCreationMsg(charity: Charity) {
    return this.createExecuteContractMsg(Registrar.address, {
      create_endowment: createEndowmentCreationMsgPayload(charity),
    });
  }

  createEmbeddedOwnerUpdateMsg(payload: RegistrarOwnerPayload) {
    return this.createEmbeddedWasmMsg(Registrar.address, {
      update_owner: payload,
    });
  }
}

function createEndowmentCreationMsgPayload(
  charity: Charity
): RegistrarCreateEndowmentPayload {
  return {
    owner: charity.Metadata.JunoWallet,
    beneficiary: charity.Metadata.JunoWallet,
    withdraw_before_maturity: false,
    maturity_time: undefined,
    maturity_height: undefined,
    profile: {
      name: charity.Registration.CharityName, // name of the Charity Endowment
      overview: charity.Metadata.CharityOverview,
      un_sdg: charity.Registration.UN_SDG, // SHOULD NOT be editable for now (only the Config.owner, ie via the Gov contract or AP CW3 Multisig can set/update)
      tier: charity.Registration.Tier!, // SHOULD NOT be editable for now (only the Config.owner, ie via the Gov contract or AP CW3 Multisig can set/update)
      logo: charity.Metadata.CharityLogo.publicUrl || "",
      image: charity.Metadata.Banner.publicUrl || "",
      url: charity.Registration.Website,
      registration_number: "",
      country_of_origin: "",
      street_address: "",
      contact_email:
        charity.Registration.CharityName_ContactEmail?.split("_")[1],
      social_media_urls: {
        facebook: "",
        linkedin: "",
        twitter: "",
      },
      number_of_employees: 1,
      average_annual_budget: "",
      annual_revenue: "",
      charity_navigator_rating: "",
      endow_type: "Charity",
    },
    cw4_members: [{ addr: charity.Metadata.JunoWallet, weight: 1 }],
    kyc_donors_only: charity.Metadata.KycDonorsOnly, //set to false initially
    cw3_threshold: { absolute_percentage: { percentage: "0.5" } }, //set initial 50%
    cw3_max_voting_period: 86400,
  };
}
