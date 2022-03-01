import { yupResolver } from "@hookform/resolvers/yup";
import { PropsWithChildren } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useGetter } from "store/accessors";
import Button from "../Button";
import routes from "../routes";
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
import { FormValues, Schema } from "./types";
import useCurrentLevel from "./useCurrentLevel";

export default function Documentation() {
  const history = useHistory();
  const user = useGetter((state) => state.user);

  const methods = useForm<FormValues>({
    resolver: yupResolver(Schema),
    mode: "onChange",
  });

  const currentLevel = useCurrentLevel(methods);

  return (
    <div className="flex flex-col gap-2 w-full h-full items-center text-left">
      <Title level={currentLevel} />

      <Form methods={methods}>
        <RowContainer>
          <LevelSection>
            <Header>Level 1</Header>
            <ProofOfIdentity />
            <WebsiteInput />
            <ProofOfRegistration />
          </LevelSection>

          <LevelSection colored={currentLevel >= 1}>
            <Header>Level 1</Header>
            <p>
              Your organization is eligible to create its endowment. Donors can
              donate funds through your organization’s landing page on Angel
              Protocol’s interface. Your organization is not displayed on the
              marketplace and cannot be found through the search bar.
            </p>
          </LevelSection>
        </RowContainer>

        <RowContainer>
          <LevelSection>
            <Header>Level 2</Header>
            <UnSdgSelector />
            <FinancialStatements />
          </LevelSection>
          <LevelSection colored={currentLevel >= 2}>
            <Header>Level 2</Header>
            <p>
              All benefits from Level 1 + your organization will be visible in
              the marketplace.
            </p>
          </LevelSection>
        </RowContainer>

        <RowContainer>
          <LevelSection>
            <Header>Level 3</Header>
            <AuditedFinancialReports />
          </LevelSection>
          <LevelSection colored={currentLevel === 3}>
            <Header>Level 3</Header>
            <p>
              All benefits from Level 2 + your organization will be able to
              receive automatic donations from members of the Angel Charity
              Alliance.
            </p>
          </LevelSection>
        </RowContainer>

        <div className="flex flex-col gap-1 w-full">
          <AuthorityToCreateCheckbox charityName={user.CharityName} />
          <PrivacyPolicyCheckbox />
        </div>

        <div className="flex justify-center">
          <Button
            className="bg-green-400 w-40 h-10 mr-2"
            disabled={methods.formState.isSubmitting}
            onClick={() => history.push(routes.dashboard)}
          >
            Back
          </Button>
          <Button
            submit
            className="w-40 h-10 bg-thin-blue"
            isLoading={methods.formState.isSubmitting}
          >
            Upload
          </Button>
        </div>
      </Form>
    </div>
  );
}

const Header = ({ children }: PropsWithChildren<{}>) => (
  <h3 className="text-lg font-bold">{children}</h3>
);

const RowContainer = ({ children }: PropsWithChildren<{}>) => (
  <div className="grid grid-cols-32 gap-3 text-sm">{children}</div>
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

type LevelSectionProps = PropsWithChildren<{ colored?: boolean }>;

const LevelSection = ({ colored, children }: LevelSectionProps) => {
  const styles = colored
    ? "ring ring-angel-blue rounded-md bg-angel-blue bg-opacity-50"
    : "";
  return (
    <div className={`flex flex-col text-left p-1 gap-3 ${styles}`}>
      {children}
    </div>
  );
};

const Form = ({
  methods,
  children,
}: PropsWithChildren<{ methods: UseFormReturn<FormValues, any> }>) => {
  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col w-full h-full gap-4 items-center"
        onSubmit={methods.handleSubmit((values) => console.log(values))}
      >
        {children}
      </form>
    </FormProvider>
  );
};
