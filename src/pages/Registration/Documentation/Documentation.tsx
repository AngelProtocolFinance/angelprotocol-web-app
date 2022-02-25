import { yupResolver } from "@hookform/resolvers/yup";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { useGetter } from "store/accessors";
import Button from "../Button";
import AuthorityToCreateCheckbox from "./AuthorityToCreateCheckbox";
import LevelDescription from "./LevelDescription";
import PrivacyPolicyCheckbox from "./PrivacyPolicyCheckbox";
import { FormValues, Schema } from "./types";

const currentLevel = 0;

export default function Documentation() {
  const user = useGetter((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: yupResolver(Schema) });

  return (
    <form
      className="flex flex-col w-full h-full gap-8 items-center"
      onSubmit={handleSubmit((values) => console.log(values))}
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
        <div className="grid grid-cols-32 gap-4">
          <div className="flex flex-col gap-1 text-left">
            <LevelSection>
              <Header>Level 1</Header>
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
            </LevelSection>
            <LevelSection>
              <Header>Level 2</Header>
            </LevelSection>
            <LevelSection>
              <Header>Level 3</Header>
            </LevelSection>
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
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        Upload
      </Button>
    </form>
  );
}

const Header = ({ children }: PropsWithChildren<{}>) => (
  <h3 className="text-lg font-bold">{children}</h3>
);

const LevelSection = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex flex-col text-left p-1">{children}</div>
);

type InputRowProps = PropsWithChildren<{
  id: string;
  label: string;
  error?: string;
  required?: true | boolean;
}>;

const InputRow = ({ id, label, error, required, children }: InputRowProps) => (
  <div className="grid grid-cols-2 items-center">
    <label htmlFor={id}>
      {label}
      {required && <span className="text-failed-red ml-0.5">*</span>}
    </label>
    <div className="flex flex-col gap-1 w-full items-center relative">
      {children}
      {error && (
        <p className="absolute left-0 -bottom-4 w-full text-center text-xs text-failed-red">
          {error}
        </p>
      )}
    </div>
  </div>
);
