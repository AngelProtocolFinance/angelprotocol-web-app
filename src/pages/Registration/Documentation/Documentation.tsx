import { yupResolver } from "@hookform/resolvers/yup";
import { PropsWithChildren, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetter } from "store/accessors";
import { app, site } from "constants/routes";
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
  const navigate = useNavigate();
  const charity = useGetter((state) => state.charity);

  const methods = useForm<FormValues>({
    resolver: yupResolver(SCHEMA),
    mode: "onChange",
    defaultValues: {
      un_sdg:
        charity.Registration.UN_SDG >= 0
          ? charity.Registration.UN_SDG
          : undefined,
      website: charity.Registration.Website,
      proofOfIdentity: charity.Registration.ProofOfIdentity,
      proofOfRegistration: charity.Registration.ProofOfRegistration,
      financialStatements: charity.Registration.FinancialStatements,
      auditedFinancialReports: charity.Registration.AuditedFinancialReports,
    },
  });
  const currentLevel = useCurrentLevel(methods);
  const { upload, isSuccess } = useUpload();

  useEffect(() => {
    if (isSuccess) {
      navigate(`${site.app}/${app.register}/${routes.dashboard}`);
    }
  }, [isSuccess, navigate]);

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
              {" "}
              <Column colored={currentLevel >= 1}>
                <Header>Level 1</Header>
                <p>
                  Your organization is eligible to create its endowment. Donors
                  can donate funds through your organization’s landing page on
                  Angel Protocol’s interface. Your organization is not displayed
                  on the marketplace and cannot be found through the search bar.
                </p>
              </Column>{" "}
              <Column className="mt-14" colored={currentLevel >= 2}>
                <Header>Level 2</Header>
                <p>
                  All benefits from Level 1 + your organization will be visible
                  in the marketplace.
                </p>
              </Column>
              <Column className="mt-20" colored={currentLevel === 3}>
                <Header>Level 3</Header>
                <p>
                  All benefits from Level 2 + your organization will be able to
                  receive automatic donations from members of the Angel Charity
                  Alliance.
                </p>
              </Column>
            </Column>
          </RowContainer>
          <div className="flex flex-col gap-1 w-full mt-5">
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
  <div className="flex justify-center w-full gap-2">
    <Header className="w-full ml-2">
      {level < 3
        ? "Upload the relevant documentation to apply for the next level."
        : "Upload to proceed..."}
    </Header>
    <Header className="w-2/3 ml-0">What are levels?</Header>
  </div>
);

const Header = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <h3 className={`text-lg font-bold ${className ?? ""}`}>{children}</h3>
);

const RowContainer = ({ children }: PropsWithChildren<{}>) => (
  <div className="grid grid-cols-32 gap-3 text-sm">{children}</div>
);

type ColumnProps = PropsWithChildren<{ colored?: boolean; className?: string }>;

const Column = ({ colored, children, className }: ColumnProps) => {
  const styles = colored
    ? "ring ring-angel-blue rounded-md bg-angel-blue/50"
    : "";
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
