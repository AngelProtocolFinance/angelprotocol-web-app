import { Charity } from "services/aws/types";
import { WalletProxy } from "providers/WalletProvider";
import Registrar from "contracts/Registrar";
import { RegistrarCreateEndowmentPayload } from "contracts/types";

export default function createEndowmentCreationMsg(
  charity: Charity,
  wallet?: WalletProxy
) {
  const payload = createMessagePayload(charity);
  const contract = new Registrar(wallet);
  return contract.createEndowmentCreationMsg(payload);
}

function createMessagePayload(
  charity: Charity
): RegistrarCreateEndowmentPayload {
  return {
    beneficiary: charity.Metadata.TerraWallet,
    cw4_members: [],
    guardians_multisig_addr: undefined,
    maturity_height: undefined,
    maturity_time: undefined,
    owner: charity.Metadata.TerraWallet,
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
