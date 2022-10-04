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
  const { charity } = useRegistrationQuery();

  const methods = useForm<DocumentationValues>({
    resolver: yupResolver(documentationSchema),
    defaultValues: {
      un_sdg: charity.Registration.UN_SDG,
      website: charity.Registration.Website,
      proofOfIdentity: charity.Registration.ProofOfIdentity,
      proofOfRegistration: charity.Registration.ProofOfRegistration,
      financialStatements: charity.Registration.FinancialStatements,
      auditedFinancialReports: charity.Registration.AuditedFinancialReports,
    },
  });

  const upload = useUpload();

  return (
    <FormProvider {...methods}>
      <form
        className="grid grid-cols-[3fr_2fr] w-full h-full gap-y-8 gap-x-4 items-center text-left"
        onSubmit={methods.handleSubmit(upload)}
      >
        <Title />
        <Column>
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

        <Column>
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

        <Column>
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
      <Header className="w-full">
        {level < 3
          ? "Upload the relevant documentation to apply for the next level."
          : "Upload to proceed..."}
      </Header>
      <Header className="w-2/3 ml-0">What are levels?</Header>
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
  return <Column {...rest} colored={currentLevel >= level} />;
};

const Column = ({ colored, children, className }: ColoredColumnProps) => {
  const styles = colored
    ? "ring ring-angel-blue rounded-md bg-angel-blue/50"
    : "";
  return (
    <div
      className={`grid h-full text-left p-3 gap-3 ${styles} ${className ?? ""}`}
    >
      {children}
    </div>
  );
};
