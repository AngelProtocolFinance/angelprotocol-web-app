import { yupResolver } from "@hookform/resolvers/yup";
import { PropsWithChildren } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import Button from "../Button";
import AuthorityToCreateCheckbox from "./AuthorityToCreateCheckbox";
import InputRow from "./InputRow";
import PrivacyPolicyCheckbox from "./PrivacyPolicyCheckbox";
import { FormValues, Schema } from "./types";

let currentLevel = 0;

export default function Documentation() {
  const user = useGetter((state) => state.user);
  const methods = useForm<FormValues>({ resolver: yupResolver(Schema) });

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col w-full h-full gap-8 items-center"
        onSubmit={methods.handleSubmit((values) => console.log(values))}
      >
        <div className="flex flex-col w-full gap-2">
          <div className="grid grid-cols-32 gap-3 text-left">
            <Header>
              Please upload the following documentation. The documentation you
              provide will inform which Level your organization will be
            </Header>
            <Header>
              {`Currently, your organization is ${
                !!currentLevel ? `Level ${currentLevel}` : "not classified"
              }`}
            </Header>
          </div>
          <div className="flex flex-col gap-0.5 text-left">
            <div className="grid grid-cols-32 gap-4">
              <LevelSection>
                <Header>Level 1</Header>
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
            </div>
            <div className="grid grid-cols-32 gap-4">
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
            </div>
            <div className="grid grid-cols-32 gap-4">
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
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full text-left text-sm">
          <AuthorityToCreateCheckbox charityName={user.CharityName} />
          <PrivacyPolicyCheckbox />
        </div>
        <Button
          submit
          className="w-40 h-10 bg-yellow-blue"
          isLoading={methods.formState.isSubmitting}
        >
          Upload
        </Button>
      </form>
    </FormProvider>
  );
}

const Header = ({ children }: PropsWithChildren<{}>) => (
  <h3 className="text-lg font-bold">{children}</h3>
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

function WebsiteInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <InputRow
      id="charityWebsite"
      label="Website of your organization"
      error={errors?.charityWebsite?.message}
      required
    >
      <input
        id="charityWebsite"
        type="text"
        className="rounded-md outline-none border-none w-full px-2 py-1 text-black"
        {...register("charityWebsite")}
      />
    </InputRow>
  );
}
