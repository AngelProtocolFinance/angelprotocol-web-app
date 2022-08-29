import { fromUtf8 } from "@cosmjs/encoding";
import { Charity } from "types/aws";
import { RegistrarCreateEndowmentPayload } from "types/contracts";
import { PLACEHOLDER_WALLET } from "test/constants";
import Registrar from "contracts/Registrar";

describe("Registrar tests", () => {
  test("createEndowmentCreationMsg should return valid MsgExecuteContract", () => {
    const registrar = new Registrar(PLACEHOLDER_WALLET);
    const payload = registrar.createEndowmentCreationMsg(CHARITY);
    expect(payload.value.sender).toBe(PLACEHOLDER_WALLET.address);
    expect(payload.value.msg).toBeDefined();
    expect(JSON.parse(fromUtf8(payload.value.msg!))).toEqual({
      create_endowment: mockPayload,
    });
  });
});

const CHARITY: Charity = {
  ContactPerson: {
    Email: "test@test.com",
    EmailVerified: true,
    FirstName: "first",
    LastName: "last",
    PhoneNumber: "+114323888",
    PK: "7fe792be-5132-4f2b-b37c-4bcd9445b773",
    Role: "ceo",
    SK: "ContactPerson",
    Goals: "hello world",
    ReferralMethod: "angel-alliance",
  },
  Registration: {
    CharityName: "charity",
    CharityName_ContactEmail: "CHARITY_test@test.com",
    RegistrationDate: "2022-05-04T10:10:10Z",
    RegistrationStatus: "Inactive",
    Website: "www.test.com",
    UN_SDG: 0,
    Tier: 1,
    ProofOfIdentity: { name: "poi", publicUrl: "https://www.storage.path/poi" },
    ProofOfRegistration: {
      name: "por",
      publicUrl: "https://www.storage.path/por",
    },
    FinancialStatements: [],
    AuditedFinancialReports: [],
    ProofOfIdentityVerified: false,
    ProofOfRegistrationVerified: false,
    FinancialStatementsVerified: false,
    AuditedFinancialReportsVerified: false,
    SK: "Registration",
  },
  Metadata: {
    Banner: { name: "banner", publicUrl: "https://www.storage.path/banner" },
    CharityLogo: { name: "logo", publicUrl: "https://www.storage.path/logo" },
    CharityOverview: "some overview",
    EndowmentContract: "",
    SK: "Metadata",
    JunoWallet: PLACEHOLDER_WALLET.address,
    KycDonorsOnly: false,
  },
};

const mockPayload: RegistrarCreateEndowmentPayload = {
  owner: CHARITY.Metadata.JunoWallet,
  beneficiary: CHARITY.Metadata.JunoWallet,
  withdraw_before_maturity: false,
  maturity_time: undefined,
  maturity_height: undefined,
  profile: {
    name: CHARITY.Registration.CharityName, // name of the Charity Endowment
    overview: CHARITY.Metadata.CharityOverview,
    un_sdg: CHARITY.Registration.UN_SDG, // SHOULD NOT be editable for now (only the Config.owner, ie via the Gov contract or AP CW3 Multisig can set/update)
    tier: CHARITY.Registration.Tier!, // SHOULD NOT be editable for now (only the Config.owner, ie via the Gov contract or AP CW3 Multisig can set/update)
    logo: CHARITY.Metadata.CharityLogo.publicUrl || "",
    image: CHARITY.Metadata.Banner.publicUrl || "",
    url: CHARITY.Registration.Website,
    registration_number: "",
    country_of_origin: "",
    street_address: "",
    contact_email: CHARITY.Registration.CharityName_ContactEmail?.split("_")[1],
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
  cw4_members: [{ addr: CHARITY.Metadata.JunoWallet, weight: 1 }],
  kyc_donors_only: CHARITY.Metadata.KycDonorsOnly, //set to false initially
  cw3_threshold: { absolute_percentage: { percentage: "0.5" } }, //set initial 50%
  cw3_max_voting_period: 86400,
};
