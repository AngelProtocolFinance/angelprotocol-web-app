import { CharityApplicationMeta } from "pages/Admin/types";
import { Charity } from "types/aws";
import { ApplicationProposal, ApplicationVote } from "types/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { contracts } from "constants/contracts";
import CW3 from ".";

export default class CW3Review extends CW3 {
  constructor(wallet: WalletState | undefined) {
    super(wallet, contracts.cw3ReviewTeam);
  }

  createProposeApplicationMsg(charity: Charity) {
    return this.createExecuteContractMsg(this.address, {
      propose_application: createApplicationProposalPayload(charity),
    });
  }
  createVoteApplicationMsg(payload: ApplicationVote) {
    return this.createExecuteContractMsg(this.address, {
      vote_application: payload,
    });
  }
}

function createApplicationProposalPayload(
  charity: Charity
): ApplicationProposal {
  const meta: CharityApplicationMeta = {
    type: "cw3_application",
    data: charity.Registration,
  };

  return {
    ref_id: charity.ContactPerson.PK!,
    msg: {
      owner: charity.Metadata.JunoWallet,
      name: charity.Registration.CharityName, // name of the Charity Endowment
      tier: charity.Registration.Tier!, // SHOULD NOT be editable for now (only the Config.owner, ie via the Gov contract or AP CW3 Multisig can set/update)
      logo: charity.Metadata.Logo!.publicUrl,
      image: charity.Metadata.Banner!.publicUrl,
      endow_type: "Charity",
      categories: { sdgs: [charity.Registration.UN_SDG], general: [] },
      withdraw_before_maturity: false,
      maturity_time: undefined,
      maturity_height: undefined,
      profile: {
        overview: charity.Metadata.CharityOverview,
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
      },
      cw4_members: [{ addr: charity.Metadata.JunoWallet, weight: 1 }],
      kyc_donors_only: charity.Metadata.KycDonorsOnly, //set to false initially
      cw3_threshold: { absolute_percentage: { percentage: "0.5" } }, //set initial 50%
      cw3_max_voting_period: 86400,
    },
    meta: JSON.stringify(meta),
  };
}
