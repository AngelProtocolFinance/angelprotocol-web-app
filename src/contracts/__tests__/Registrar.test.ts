import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Charity } from "types/server/aws";
import Registrar from "contracts/Registrar";
import configureClient from "helpers/configureClient";

const TEST_MNEMONIC =
  "pact fancy rough prison twenty dismiss mushroom rival page ship quantum deer rookie system cargo";

describe("Registrar tests", () => {
  test("createEndowmentCreationMsg should return valid MsgExecuteContract", async () => {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(TEST_MNEMONIC, {
      prefix: "juno",
    });
    const { client, address } = await configureClient(wallet);

    const registrar = new Registrar(client, address);
    const payload = registrar.createEndowmentCreationMsg(CHARITY);

    expect(payload.sender).toBe(address);
    expect(payload.execute_msg).toStrictEqual({
      create_endowment: {
        beneficiary: address,
        cw4_members: [],
        guardians_multisig_addr: undefined,
        maturity_height: undefined,
        maturity_time: undefined,
        owner: address,
        profile: {
          annual_revenue: undefined,
          average_annual_budget: undefined,
          charity_navigator_rating: undefined,
          contact_email: "test@test.com",
          country_of_origin: undefined,
          endow_type: "Charity",
          image: "https://www.storage.path/banner",
          logo: "https://www.storage.path/logo",
          name: "charity",
          number_of_employees: undefined,
          overview: "some overview",
          registration_number: undefined,
          social_media_urls: {
            facebook: undefined,
            linkedin: undefined,
            twitter: undefined,
          },
          street_address: undefined,
          tier: 1,
          un_sdg: 0,
          url: "www.test.com",
        },
        withdraw_before_maturity: false,
      },
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
    JunoWallet: "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
    KycDonorsOnly: false,
  },
};
