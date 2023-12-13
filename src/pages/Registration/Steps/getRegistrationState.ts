import { InitReg, RegistrationState } from "../types";
import {
  BankingDetails,
  DoneBanking,
  DoneDocs,
  DoneFSAInquiry,
  DoneOrgDetails,
  FSAInquiry,
  InitContact,
  OrgDetails,
  SavedRegistration,
  TDocumentation,
  isDoneBanking,
  isDoneContact,
  isDoneDocs,
  isDoneFSAInquiry,
  isDoneOrgDetails,
  isSubmitted,
} from "types/aws";
import { steps } from "../routes";

export function getRegistrationState(reg: SavedRegistration): {
  state: RegistrationState;
  nextStep: steps;
} {
  if (isSubmitted(reg)) {
    const { ContactPerson: c, Registration: r } = reg;
    return {
      state: {
        step: 6,
        data: {
          init: initReg(c),
          contact: { ...c, orgName: r.OrganizationName },
          orgDetails: orgDetails(r),
          fsaInquiry: fsaInquiry(r),
          documentation: docs(r),
          banking: bankDetails(r),
          status: r.RegistrationStatus,
          endowId: r.EndowmentId,
        },
      },
      nextStep: steps.summary,
    };
  }

  if (isDoneBanking(reg)) {
    const { ContactPerson: c, Registration: r } = reg;
    return {
      state: {
        step: 5,
        data: {
          init: initReg(c),
          contact: { ...c, orgName: r.OrganizationName },
          orgDetails: orgDetails(r),
          fsaInquiry: fsaInquiry(r),
          documentation: docs(r),
          banking: bankDetails(r),
        },
      },
      nextStep: steps.summary,
    };
  }

  if (isDoneDocs(reg)) {
    const { ContactPerson: c, Registration: r } = reg;
    const isSignedFSA =
      r.Documentation.DocType === "FSA"
        ? !!r.Documentation.SignedFiscalSponsorshipAgreement
        : true;
    return {
      state: {
        step: (isSignedFSA ? 4 : 3) as 4,
        data: {
          init: initReg(c),
          contact: { ...c, orgName: r.OrganizationName },
          orgDetails: orgDetails(r),
          fsaInquiry: fsaInquiry(r),
          documentation: docs(r),
        },
      },
      nextStep: steps.banking,
    };
  }

  if (isDoneFSAInquiry(reg)) {
    const { ContactPerson: c, Registration: r } = reg;
    return {
      state: {
        step: 3,
        data: {
          init: initReg(c),
          contact: { ...c, orgName: r.OrganizationName },
          orgDetails: orgDetails(r),
          fsaInquiry: fsaInquiry(r),
        },
      },
      nextStep: steps.docs,
    };
  }
  if (isDoneOrgDetails(reg)) {
    const { ContactPerson: c, Registration: r } = reg;
    return {
      state: {
        step: 2,
        data: {
          init: initReg(c),
          contact: { ...c, orgName: r.OrganizationName },
          orgDetails: orgDetails(r),
        },
      },
      nextStep: steps.fsaInquiry,
    };
  }

  if (isDoneContact(reg)) {
    const { ContactPerson: c, Registration: r } = reg;
    return {
      state: {
        step: 1,
        data: {
          init: initReg(c),
          contact: { ...c, orgName: r.OrganizationName },
        },
      },
      nextStep: steps.orgDetails,
    };
  }

  const { ContactPerson: c } = reg;
  return {
    state: {
      step: 1,
      data: {
        init: initReg(c),
      },
    },
    nextStep: steps.contact,
  };
}

function initReg(i: InitContact): InitReg {
  return {
    email: i.Email,
    reference: i.PK,
  };
}

function orgDetails(reg: DoneOrgDetails["Registration"]): OrgDetails {
  return {
    Website: reg.Website,
    HqCountry: reg.HqCountry,
    ActiveInCountries: reg.ActiveInCountries,
    EndowDesignation: reg.EndowDesignation,
    KycDonorsOnly: reg.KycDonorsOnly,
    UN_SDG: reg.UN_SDG,
  };
}

function docs(reg: DoneDocs["Registration"]): TDocumentation["Documentation"] {
  const doc = reg.Documentation;
  if (doc.DocType === "Non-FSA") {
    return { EIN: doc.EIN, DocType: doc.DocType };
  }
  return {
    DocType: doc.DocType,
    ProofOfIdentity: doc.ProofOfIdentity,
    RegistrationNumber: doc.RegistrationNumber,
    ProofOfRegistration: doc.ProofOfRegistration,
    LegalEntityType: doc.LegalEntityType,
    ProjectDescription: doc.ProjectDescription,
    FiscalSponsorshipAgreementSigningURL:
      doc.FiscalSponsorshipAgreementSigningURL,
    SignedFiscalSponsorshipAgreement: doc.SignedFiscalSponsorshipAgreement,
  };
}

function bankDetails(reg: DoneBanking["Registration"]): BankingDetails {
  return {
    BankStatementFile: reg.BankStatementFile,
    wise_recipient_id: reg.wise_recipient_id,
  };
}

function fsaInquiry(reg: DoneFSAInquiry["Registration"]): FSAInquiry {
  return {
    AuthorizedToReceiveTaxDeductibleDonations:
      reg.AuthorizedToReceiveTaxDeductibleDonations,
  };
}
