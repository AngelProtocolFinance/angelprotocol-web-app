import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useGetter } from "store/accessors";
import { InputRow } from "../common";
import ButtonSection from "./ButtonSection";
import DescriptionInput from "./DescriptionInput";
import LogoInput from "./LogoInput";
import { FormValues, SCHEMA } from "./types";

export default function AdditionalInformation() {
  const methods = useForm<FormValues>({
    resolver: yupResolver(SCHEMA),
    defaultValues: {
      charity_overview: "",
      logo: [],
    },
  });

  return (
    <div className="flex flex-col gap-5 items-center">
      <Title />

      <FormProvider {...methods}>
        <form
          className="flex flex-col justify-center w-5/6 h-full gap-4"
          onSubmit={methods.handleSubmit((values) => console.log(values))}
        >
          <OrganizationName />
          <DescriptionInput />
          <LogoInput />
          <Separator />
          <ButtonSection />
        </form>
      </FormProvider>
    </div>
  );
}

function Title() {
  return (
    <h2 className="flex text-lg xl:text-xl font-semibold gap-2 items-center">
      Your logo and description will be used to populate your public profile
    </h2>
  );
}

function OrganizationName() {
  const user = useGetter((state) => state.user);

  return (
    <InputRow id="charityName" label="Name of your organization">
      <span className="flex w-full font-bold">{user.CharityName}</span>
    </InputRow>
  );
}

const Separator = () => <div className="h-4" />;
