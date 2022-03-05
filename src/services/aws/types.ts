export interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}

type DocumentObject = { name: string; dataUrl: string };

export type UpdateDocumentationData = {
  PK?: string;
  body: {
    website: string;
    un_sdg: number;
    proofOfIdentity: DocumentObject;
    proofOfRegistration: DocumentObject;
    financialStatements: DocumentObject[];
    auditedFinancialReports: DocumentObject[];
  };
};

export type UpdateDocumentationResult = {
  website: string;
  un_sdg: number;
  proofOfIdentity: string;
  proofOfRegistration: string;
  financialStatements: string[];
  auditedFinancialReports: string[];
};
