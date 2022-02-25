import { yupResolver } from "@hookform/resolvers/yup";
import { PropsWithChildren } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useGetter } from "store/accessors";
import Button from "../Button";
import routes from "../routes";
import AuthorityToCreateCheckbox from "./AuthorityToCreateCheckbox";
import InputRow from "./InputRow";
import PrivacyPolicyCheckbox from "./PrivacyPolicyCheckbox";
import { FormValues, Schema } from "./types";
import FileDropzone from "./FileDropzone";

let currentLevel = 0;

export default function Documentation() {
  const history = useHistory();
  const user = useGetter((state) => state.user);
  const methods = useForm<FormValues>({
    resolver: yupResolver(Schema),
  });

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col w-full h-full gap-8 items-center"
        onSubmit={methods.handleSubmit((values) => console.log(values))}
      >
        <div className="flex flex-col w-full gap-2 text-left">
          <RowContainer>
            <Header>
              Please upload the following documentation. The documentation you
              provide will inform which Level your organization will be
            </Header>
            <Header>
              {`Currently, your organization is ${
                !!currentLevel ? `Level ${currentLevel}` : "not classified"
              }`}
            </Header>
          </RowContainer>
          <div className="flex flex-col gap-0.5">
            <RowContainer>
              <LevelSection>
                <Header>Level 1</Header>
                <ProofOfIdentityDropzone />
                <WebsiteInput />
              </LevelSection>
              <LevelSection colored={currentLevel >= 1}>
                <Header>Level 1</Header>
                <p>
                  Your organization is eligible to create its endowment. Donors
                  can donate funds through your organization’s landing page on
                  Angel Protocol’s interface. Your organization is not displayed
                  on the marketplace and cannot be found through the search bar.
                </p>
              </LevelSection>
            </RowContainer>
            <RowContainer>
              <LevelSection>
                <Header>Level 2</Header>
              </LevelSection>
              <LevelSection colored={currentLevel >= 2}>
                <Header>Level 2</Header>
                <p>
                  All benefits from Level 1 + your organization will be visible
                  in the marketplace.
                </p>
              </LevelSection>
            </RowContainer>
            <RowContainer>
              <LevelSection>
                <Header>Level 3</Header>
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
          </div>
        </div>
        <div className="flex flex-col w-full text-left text-sm gap-3">
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
      </form>
    </FormProvider>
  );
}

const Header = ({ children }: PropsWithChildren<{}>) => (
  <h3 className="text-lg font-bold">{children}</h3>
);

const RowContainer = ({ children }: PropsWithChildren<{}>) => (
  <div className="grid grid-cols-32 gap-3">{children}</div>
);

type LevelSectionProps = PropsWithChildren<{ colored?: boolean }>;

const LevelSection = ({ colored, children }: LevelSectionProps) => {
  const styles = colored
    ? "ring ring-angel-blue rounded-md bg-angel-blue bg-opacity-50"
    : "";
  return (
    <div className={`flex flex-col text-left p-1 gap-2 ${styles}`}>
      {children}
    </div>
  );
};

function ProofOfIdentityDropzone() {
  return (
    <InputRow id="proofOfIdentity" label="Your proof of identity" required>
      <FileDropzone name="proofOfIdentity" />
    </InputRow>
  );
}

function WebsiteInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <InputRow id="charityWebsite" label="Website of your organization" required>
      <input
        id="charityWebsite"
        type="text"
        className="h-8 rounded-md outline-none border-none w-full px-2 py-1 text-black"
        {...register("charityWebsite")}
      />
      {errors.charityWebsite?.message && (
        <p className="absolute left-0 -bottom-4 w-full text-xs text-failed-red text-center">
          {errors.charityWebsite.message}
        </p>
      )}
    </InputRow>
  );
}
