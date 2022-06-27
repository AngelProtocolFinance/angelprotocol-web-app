import { Charity } from "types/server/aws";
import Registrar from "contracts/Registrar";
import { fromUtf8 } from "helpers/third-party/cosmjs";

describe("Registrar tests", () => {
  test("createEndowmentCreationMsg should return valid MsgExecuteContract", () => {
    const registrar = new Registrar(
      "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek"
    );
    const payload = registrar.createEndowmentCreationMsg(CHARITY);

    expect(payload.value.sender).toBe(
      "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek"
    );
    expect(JSON.parse(fromUtf8(payload.value.msg!))).toStrictEqual({
      create_endowment: {
        beneficiary: "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
        cw4_members: [],
        owner: "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
        profile: {
          contact_email: "test@test.com",
          endow_type: "Charity",
          image: "https://www.storage.path/banner",
          logo: "https://www.storage.path/logo",
          name: "charity",
          overview: "some overview",
          social_media_urls: {},
          tier: 1,
          un_sdg: 0,
          url: "www.test.com",
        },
        withdraw_before_maturity: false,
        kyc_donors_only: false,
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
