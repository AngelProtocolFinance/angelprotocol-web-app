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
      <Container>
        <Title />

        <form
          className="flex flex-col w-full h-full gap-4 items-center"
          onSubmit={methods.handleSubmit(upload)}
        >
          <RowContainer>
            <Column>
              <Column className="mt-5">
                <Header>Level 1</Header>
                <ProofOfIdentity />
                <WebsiteInput />
                <ProofOfRegistration />
              </Column>
              <Column className="mt-12">
                <Header>Level 2</Header>
                <UnSdgSelector />
                <FinancialStatements />
              </Column>
              <Column className="mt-8">
                <Header>Level 3</Header>
                <AuditedFinancialReports />
              </Column>
            </Column>
            <Column className="border-8 border-white/20 w-full px-2">
              <HighlightColumn level={1}>
                <Header>Level 1</Header>
                <p>
                  Your organization is eligible to create its endowment. Donors
                  can donate funds through your organization’s landing page on
                  Angel Protocol’s interface. Your organization is not displayed
                  on the marketplace and cannot be found through the search bar.
                </p>
              </HighlightColumn>
              <HighlightColumn className="mt-14" level={2}>
                <Header>Level 2</Header>
                <p>
                  All benefits from Level 1 + your organization will be visible
                  in the marketplace.
                </p>
              </HighlightColumn>
              <HighlightColumn className="mt-20" level={3}>
                <Header>Level 3</Header>
                <p>
                  All benefits from Level 2 + your organization will be able to
                  receive automatic donations from members of the Angel
                  Alliance.
                </p>
              </HighlightColumn>
            </Column>
          </RowContainer>
          <div className="flex flex-col gap-1 w-full mt-5">
            <AuthorityToCreateCheckbox />
            <PrivacyPolicyCheckbox />
          </div>
          <ButtonSection />
        </form>
      </Container>
    </FormProvider>
  );
}

const Container = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex flex-col gap-5 w-full h-full items-center text-left">
    {children}
  </div>
);

const Title = () => {
  const level = useCurrentLevel();

  return (
    <div className="flex justify-center w-full gap-2">
      <Header className="w-full ml-2">
        {level < 3
          ? "Upload the relevant documentation to apply for the next level."
          : "Upload to proceed..."}
      </Header>
      <Header className="w-2/3 ml-0">What are levels?</Header>
    </div>
  );
};

const Header = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <h3 className={`text-lg font-bold ${className ?? ""}`}>{children}</h3>
);

const RowContainer = ({ children }: PropsWithChildren<{}>) => (
  <div className="grid grid-cols-[3fr_2fr] gap-3 text-sm">{children}</div>
);

type ColumnProps = PropsWithChildren<{ className?: string }>;
type HighlightColumnProps = ColumnProps & { level: number };
type ColoredColumnProps = ColumnProps & { colored?: boolean };

const HighlightColumn = ({ level, ...rest }: HighlightColumnProps) => {
  const currentLevel = useCurrentLevel();
  return <Column {...rest} colored={currentLevel >= level} />;
};

const Column = ({ colored, children, className }: ColoredColumnProps) => {
  const styles = colored ? "ring ring-blue rounded-md bg-blue/50" : "";
  return (
    <div
      className={`flex flex-col text-left p-1 gap-3 ${styles} ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};
