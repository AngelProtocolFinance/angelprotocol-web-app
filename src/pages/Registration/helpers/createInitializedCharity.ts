import { Charity, Metadata, Registration } from "services/aws/types";

export default function createInitializedCharity(charity: Charity): Charity {
  return {
    ContactPerson: { ...charity.ContactPerson },
    Metadata: getMetadata(charity),
    Registration: getRegistration(charity),
  };
}

function getMetadata({ Metadata }: Charity): Metadata {
  return {
    Banner: Metadata?.Banner || { name: "" },
    CharityLogo: Metadata?.CharityLogo || { name: "" },
    CharityOverview: Metadata?.CharityOverview || "",
    EndowmentContract: Metadata?.EndowmentContract || "",
    SK: "Metadata",
    TerraWallet: Metadata?.TerraWallet || "",
  };
}

function getRegistration({ Registration }: Charity): Registration {
  return {
    ...Registration,
    AuditedFinancialReports: Registration.AuditedFinancialReports || [],
    AuditedFinancialReportsVerified: false,
    FinancialStatements: Registration.FinancialStatements || [],
    FinancialStatementsVerified: false,
    ProofOfIdentity: Registration.ProofOfIdentity || { name: "" },
    ProofOfIdentityVerified: false,
    ProofOfRegistration: Registration.ProofOfRegistration || {
      name: "",
    },
    ProofOfRegistrationVerified: false,
    Tier: undefined,
    UN_SDG: +Registration.UN_SDG,
    Website: "",
  };
}
