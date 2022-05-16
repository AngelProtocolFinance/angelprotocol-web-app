import { CreateTxOptions } from "@terra-money/terra.js";
import { Charity } from "services/aws/types";
import { WalletProxy } from "providers/WalletProvider";
import { chainOptions } from "providers/WalletProvider/chainOptions";
import { TORUS_CONNECTION } from "providers/WalletProvider/useWalletContext/types";
import Registrar from "contracts/Registrar";

describe("Registrar tests", () => {
  test("createEndowmentCreationMsg should return valid MsgExecuteContract", () => {
    const registrar = new Registrar(WALLET);
    const payload = registrar.createEndowmentCreationMsg(CHARITY);

    expect(payload.sender).toBe("terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek");
    expect(payload.execute_msg).toStrictEqual({
      create_endowment: {
        beneficiary: "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
        cw4_members: [],
        guardians_multisig_addr: undefined,
        maturity_height: undefined,
        maturity_time: undefined,
        owner: "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
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
    TerraWallet: "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
  },
};

const WALLET: WalletProxy = {
  connection: TORUS_CONNECTION,
  address: "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
  network: chainOptions.walletConnectChainIds[0], // testnet
  post: async (_: CreateTxOptions) => ({
    result: {
      height: 1,
      raw_log: "",
      txhash: "",
    },
    success: true,
    msgs: [],
  }),
  connect: async (..._: any[]) => {},
  disconnect: async () => {},
};
