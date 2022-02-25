import { yupResolver } from "@hookform/resolvers/yup";
import { PropsWithChildren } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import Button from "../Button";
import AuthorityToCreateCheckbox from "./AuthorityToCreateCheckbox";
import InputRow from "./InputRow";
import LevelDescription from "./LevelDescription";
import PrivacyPolicyCheckbox from "./PrivacyPolicyCheckbox";
import { FormValues, Schema } from "./types";

const currentLevel = 0;

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
          <div className="grid grid-cols-32 gap-4 text-sm">
            <div className="flex flex-col gap-1 text-left">
              <Level>
                <Header>Level 1</Header>
                <WebsiteInput />
              </Level>
              <Level>
                <Header>Level 2</Header>
              </Level>
              <Level>
                <Header>Level 3</Header>
              </Level>
            </div>
            <LevelDescription />
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

const Level = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex flex-col text-left p-1 gap-2">{children}</div>
);

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
