import { CharityData, Metadata, Registration } from "services/aws/types";
import { User } from "services/user/types";

export default function createUserData(
  jwtData: CharityData,
  token: string
): User {
  return {
    ContactPerson: { ...jwtData.ContactPerson },
    Metadata: getMetadata(jwtData),
    Registration: getRegistration(jwtData),
    token: token,
  };
}

function getMetadata(jwtData: CharityData): Metadata {
  return {
    Banner: jwtData.Metadata?.Banner || { name: "" },
    CharityLogo: jwtData.Metadata?.CharityLogo || { name: "" },
    CharityOverview: jwtData.Metadata?.CharityOverview || "",
    TerraWallet: jwtData.Metadata?.TerraWallet || "",
  };
}

function getRegistration({ Registration }: CharityData): Registration {
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
