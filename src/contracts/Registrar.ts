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
      name: charity.Registration.CharityName,
      overview: charity.Metadata.CharityOverview,
      un_sdg: charity.Registration.UN_SDG,
      tier: charity.Registration.Tier!,
      logo: charity.Metadata.CharityLogo.publicUrl || "",
      image: charity.Metadata.Banner.publicUrl || "",
      social_media_urls: {},
      endow_type: "Charity",
    },
    cw4_members: [{ addr: charity.Metadata.JunoWallet, weight: 1 }],
    kyc_donors_only: false, //set to false initially
    cw3_threshold: { absolute_percentage: { percentage: "0.5" } }, //set initial 50%
    cw3_max_voting_period: 86400,
  };
}
