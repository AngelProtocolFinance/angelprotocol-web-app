import { yupResolver } from "@hookform/resolvers/yup";
import { app, site } from "constants/routes";
import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useGetter } from "store/accessors";
import routes from "../routes";
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
import { FormValues, SCHEMA } from "./types";
import useCurrentLevel from "./useCurrentLevel";
import useUpload from "./useUpload";

export default function Documentation() {
  const user = useGetter((state) => state.user);
  const methods = useForm<FormValues>({
    resolver: yupResolver(SCHEMA),
    mode: "onChange",
    defaultValues: {
      un_sdg: user.UN_SDG,
      website: user.Website,
      proofOfIdentity: [],
      proofOfRegistration: [],
      financialStatements: [],
      auditedFinancialReports: [],
    },
  });
  const currentLevel = useCurrentLevel(methods);
  const { upload, isSuccess } = useUpload();

  if (isSuccess) {
    return <Redirect to={`${site.app}/${app.register}/${routes.dashboard}`} />;
  }

  return (
    <Container>
      <Title level={currentLevel} />

      <FormProvider {...methods}>
        <form
          className="flex flex-col w-full h-full gap-4 items-center"
          onSubmit={methods.handleSubmit(upload)}
        >
          <RowContainer>
            <Column>
              <Header>Level 1</Header>
              <ProofOfIdentity />
              <WebsiteInput />
              <ProofOfRegistration />
            </Column>

            <Column colored={currentLevel >= 1}>
              <Header>Level 1</Header>
              <p>
                Your organization is eligible to create its endowment. Donors
                can donate funds through your organization’s landing page on
                Angel Protocol’s interface. Your organization is not displayed
                on the marketplace and cannot be found through the search bar.
              </p>
            </Column>
          </RowContainer>

          <RowContainer>
            <Column>
              <Header>Level 2</Header>
              <UnSdgSelector />
              <FinancialStatements />
            </Column>
            <Column colored={currentLevel >= 2}>
              <Header>Level 2</Header>
              <p>
                All benefits from Level 1 + your organization will be visible in
                the marketplace.
              </p>
            </Column>
          </RowContainer>

          <RowContainer>
            <Column>
              <Header>Level 3</Header>
              <AuditedFinancialReports />
            </Column>
            <Column colored={currentLevel === 3}>
              <Header>Level 3</Header>
              <p>
                All benefits from Level 2 + your organization will be able to
                receive automatic donations from members of the Angel Charity
                Alliance.
              </p>
            </Column>
          </RowContainer>

          <div className="flex flex-col gap-1 w-full">
            <AuthorityToCreateCheckbox />
            <PrivacyPolicyCheckbox />
          </div>

          <ButtonSection />
        </form>
      </FormProvider>
    </Container>
  );
}

const Container = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex flex-col gap-2 w-full h-full items-center text-left">
    {children}
  </div>
);

const Title = ({ level }: { level: number }) => (
  <RowContainer>
    <Header>
      Please upload the following documentation. The documentation you provide
      will inform which Level your organization will be
    </Header>
    <Header>
      {`Currently, your organization is ${
        !!level ? `Level ${level}` : "not classified"
      }`}
    </Header>
  </RowContainer>
);

const Header = ({ children }: PropsWithChildren<{}>) => (
  <h3 className="text-lg font-bold">{children}</h3>
);

const RowContainer = ({ children }: PropsWithChildren<{}>) => (
  <div className="grid grid-cols-32 gap-3 text-sm">{children}</div>
);

type ColumnProps = PropsWithChildren<{ colored?: boolean }>;

const Column = ({ colored, children }: ColumnProps) => {
  const styles = colored
    ? "ring ring-angel-blue rounded-md bg-angel-blue bg-opacity-50"
    : "";
  return (
    <div className={`flex flex-col text-left p-1 gap-3 ${styles}`}>
      {children}
    </div>
  );
};
