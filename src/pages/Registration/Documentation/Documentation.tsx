import { yupResolver } from "@hookform/resolvers/yup";
import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DocumentationValues } from "pages/Registration/types";
import { useRegistrationQuery } from "services/aws/registration";
import ButtonSection from "./ButtonSection";
import {
  AuditedFinancialReports,
  AuthorityToCreateCheckbox,
  FinancialStatements,
  PrivacyPolicyCheckbox,
  ProofOfIdentity,
  ProofOfRegistration,
  UnSdgSelector,
  WebsiteInput,
} from "./Fields";
import { documentationSchema } from "./documentationSchema";
import useCurrentLevel from "./useCurrentLevel";
import useUpload from "./useUpload";

export default function Documentation() {
  const { application } = useRegistrationQuery();

  const methods = useForm<DocumentationValues>({
    resolver: yupResolver(documentationSchema),
    defaultValues: {
      un_sdg: application.Registration.UN_SDG,
      website: application.Registration.Website,
      proofOfIdentity: application.Registration.ProofOfIdentity,
      proofOfRegistration: application.Registration.ProofOfRegistration,
      financialStatements: application.Registration.FinancialStatements,
      auditedFinancialReports: application.Registration.AuditedFinancialReports,
    },
  });

  const upload = useUpload();

  return (
    <FormProvider {...methods}>
      <form
        className="grid grid-cols-[3fr_2fr] w-full h-full gap-y-8 items-center text-left"
        onSubmit={methods.handleSubmit(upload)}
      >
        <Title />
        <Column className="pr-4">
          <Header>Level 1</Header>
          <ProofOfIdentity />
          <WebsiteInput />
          <ProofOfRegistration />
          <UnSdgSelector classes="mt-3" />
        </Column>
        <HighlightColumn level={1}>
          <Header>Level 1</Header>
          <p>
            Your organization is eligible to create its endowment. Donors can
            donate funds through your organization’s landing page on Angel
            Protocol’s interface. Your organization is not displayed on the
            marketplace and cannot be found through the search bar.
          </p>
        </HighlightColumn>

        <Column className="pr-4">
          <Header>Level 2</Header>
          <FinancialStatements />
        </Column>
        <HighlightColumn level={2}>
          <Header>Level 2</Header>
          <p>
            All benefits from Level 1 + your organization will be visible in the
            marketplace.
          </p>
        </HighlightColumn>

        <Column className="pr-4">
          <Header>Level 3</Header>
          <AuditedFinancialReports />
        </Column>
        <HighlightColumn level={3}>
          <Header>Level 3</Header>
          <p>
            All benefits from Level 2 + your organization will be able to
            receive automatic donations from members of the Angel Alliance.
          </p>
        </HighlightColumn>

        <div className="grid col-span-2 gap-1 w-full mt-5">
          <AuthorityToCreateCheckbox />
          <PrivacyPolicyCheckbox />
        </div>
        <ButtonSection classes="col-span-2" />
      </form>
    </FormProvider>
  );
}

const Title = () => {
  const level = useCurrentLevel();

  return (
    <>
      <Header className="max-w-md self-start">
        {level < 3
          ? "Upload the relevant documentation to apply for the next level."
          : "Upload to proceed..."}
      </Header>
      <Header className="self-start">What are levels?</Header>
    </>
  );
};

const Header = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <h3 className={`text-lg font-bold ${className ?? ""}`}>{children}</h3>
);

type ColumnProps = PropsWithChildren<{ className?: string }>;
type HighlightColumnProps = ColumnProps & { level: number };
type ColoredColumnProps = ColumnProps & { colored?: boolean };

const HighlightColumn = ({ level, ...rest }: HighlightColumnProps) => {
  const currentLevel = useCurrentLevel();
  return <Column {...rest} colored={currentLevel >= level} className="p-2" />;
};

const Column = ({ colored, children, className }: ColoredColumnProps) => {
  const styles = colored
    ? "ring ring-angel-blue rounded-md bg-angel-blue/50"
    : "";
  return (
    <div
      className={`grid h-full text-left gap-3 pb-6 border-b border-zinc-50/20 ${styles} ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};
