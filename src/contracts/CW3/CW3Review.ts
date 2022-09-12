import { Charity } from "types/aws";
import { ApplicationProposal, ApplicationVote } from "types/contracts";
import { WalletState } from "contexts/WalletContext/WalletContext";
import { contracts } from "constants/contracts";
import CW3 from ".";

export default class CW3Review extends CW3 {
  private static address = contracts.cw3ReviewTeam;

  constructor(wallet: WalletState | undefined) {
    super(wallet, CW3Review.address);
  }
  createProposeApplicationMsg(refId: string, charity: Charity) {
    return this.createExecuteContractMsg(this.address, {
      propose_application: createApplicationProposalPayload(refId, charity),
    });
  }
  createVoteApplicationMsg(payload: ApplicationVote) {
    return this.createExecuteContractMsg(this.address, {
      vote_application: payload,
    });
  }
}

function createApplicationProposalPayload(
  refId: string,
  charity: Charity
): ApplicationProposal {
  return {
    ref_id: refId,
    msg: {
      owner: charity.Metadata.JunoWallet,
      beneficiary: charity.Metadata.JunoWallet,
      withdraw_before_maturity: false,
      maturity_time: undefined,
      maturity_height: undefined,
      profile: {
        name: charity.Registration.CharityName, // name of the Charity Endowment
        overview: charity.Metadata.CharityOverview,
        categories: { sdgs: [charity.Registration.UN_SDG], general: [] },
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
    },
  };
}
