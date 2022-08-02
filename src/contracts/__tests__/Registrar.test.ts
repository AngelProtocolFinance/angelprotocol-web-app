import { fromUtf8 } from "@cosmjs/encoding";
import { Charity } from "types/server/aws";
import { WalletState } from "contexts/WalletContext/WalletContext";
import {
  placeholderChain,
  placeholderToken,
} from "contexts/WalletContext/constants";
import Registrar from "contracts/Registrar";

describe("Registrar tests", () => {
  test("createEndowmentCreationMsg should return valid MsgExecuteContract", () => {
    const registrar = new Registrar(WALLET);
    const payload = registrar.createEndowmentCreationMsg(CHARITY);

    expect(payload.value.sender).toBe(WALLET.address);
    expect(payload.value.msg).toBeDefined();
    expect(JSON.parse(fromUtf8(payload.value.msg!))).toEqual({
      create_endowment: {
        beneficiary: WALLET.address,
        cw4_members: [],
        guardians_multisig_addr: undefined,
        maturity_height: undefined,
        maturity_time: undefined,
        owner: WALLET.address,
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
          social_media_urls: {},
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

const WALLET: WalletState = {
  walletIcon: "",
  displayCoin: placeholderChain.native_currency,
  coins: placeholderChain.tokens,
  address: "juno1qsn67fzym4hak4aly07wvcjxyzcld0n4s726r2fs9km2tlahlc5qg2drvn",
  chain: placeholderChain,
  providerId: "keplr",
  getBalance: (_: string) => placeholderToken.balance,
};

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
    JunoWallet: WALLET.address,
    KycDonorsOnly: false,
  },
};
