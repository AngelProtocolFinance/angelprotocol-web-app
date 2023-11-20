import { Application } from "types/aws";

const application = (
  uuid: ReturnType<typeof window.crypto.randomUUID>
): Application => {
  const name = "TestOrg" + uuid.split("-").slice(0, 1);
  return {
    PK: uuid,
    SK: "Registration",
    RegistrationDate: new Date().toISOString(),
    RegistrationStatus: "Under Review",
    UN_SDG: [1, 2, 4],
    bank_verification_status: "Not Submitted",
    Website: "https://google.com",
    OrganizationName: name,
    HqCountry: "United States",
    ActiveInCountries: ["United States"],
    EndowDesignation: "Charity",
    KycDonorsOnly: false,
    AuthorizedToReceiveTaxDeductibleDonations: true,
    Documentation: { DocType: "Non-FSA", EIN: "13131" },
    BankStatementFile: {
      name: "place holder file.pdf",
      publicUrl: "https://google.com",
    },
    wise_recipient_id: "123",
    Email: "justin@better.giving",
    EndowmentId: 1,
    FirstName: "first",
    LastName: "last",
    PhoneNumber: "131312",
    Goals: "1231",
    Role: "board-member",
    OtherRole: "",
    ReferralMethod: "angel-alliance",
    ReferralCode: "",
    OtherReferralMethod: "",
  };
};

export const applications: Application[] = Array(10)
  .fill(0)
  .map(() => application(window.crypto.randomUUID()));
