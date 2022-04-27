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
    TerraWallet: Metadata?.TerraWallet || "",
  };
}

function getRegistration({ Registration }: Charity): Registration {
  return {
    ...Registration,
    AuditedFinancialReports: Registration.AuditedFinancialReports || [],
    FinancialStatements: Registration.FinancialStatements || [],
    ProofOfIdentity: Registration.ProofOfIdentity || { name: "" },
    ProofOfRegistration: Registration.ProofOfRegistration || {
      name: "",
    },
    UN_SDG: +Registration.UN_SDG,
  };
}
