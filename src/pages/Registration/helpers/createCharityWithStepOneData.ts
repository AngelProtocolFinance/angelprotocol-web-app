import { Charity, Metadata, Registration } from "types/server/aws";

export default function createCharityWithStepOneData(
  charity: Charity
): Charity {
  return {
    ContactPerson: { ...charity.ContactPerson },
    Metadata: getMetadata(),
    Registration: getRegistration(charity),
  };
}

function getMetadata(): Metadata {
  return {
    Banner: { name: "" },
    CharityLogo: { name: "" },
    CharityOverview: "",
    EndowmentContract: "",
    SK: "Metadata",
    TerraWallet: "",
  };
}

function getRegistration({ Registration }: Charity): Registration {
  return {
    ...Registration,
    AuditedFinancialReports: [],
    AuditedFinancialReportsVerified: false,
    FinancialStatements: [],
    FinancialStatementsVerified: false,
    ProofOfIdentity: { name: "" },
    ProofOfIdentityVerified: false,
    ProofOfRegistration: { name: "" },
    ProofOfRegistrationVerified: false,
    Tier: undefined,
    UN_SDG: +Registration.UN_SDG,
    Website: "",
  };
}
