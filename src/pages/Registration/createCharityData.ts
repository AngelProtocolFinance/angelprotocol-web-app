import { Charity, Metadata, Registration } from "services/aws/types";
import { CharityData } from "./store";

export default function createCharityData(
  jwtData: Charity,
  token: string
): CharityData {
  return {
    ContactPerson: { ...jwtData.ContactPerson },
    Metadata: getMetadata(jwtData),
    Registration: getRegistration(jwtData),
    token: token,
  };
}

function getMetadata(jwtData: Charity): Metadata {
  return {
    Banner: jwtData.Metadata?.Banner || { name: "" },
    CharityLogo: jwtData.Metadata?.CharityLogo || { name: "" },
    CharityOverview: jwtData.Metadata?.CharityOverview || "",
    TerraWallet: jwtData.Metadata?.TerraWallet || "",
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
