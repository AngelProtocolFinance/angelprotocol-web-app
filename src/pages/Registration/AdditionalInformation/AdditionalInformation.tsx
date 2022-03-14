import { yupResolver } from "@hookform/resolvers/yup";
import { app, site } from "constants/routes";
import { FormProvider, useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useGetter } from "store/accessors";
import { InputRow } from "../common";
import routes from "../routes";
import ButtonSection from "./ButtonSection";
import DescriptionInput from "./DescriptionInput";
import ImageInput from "./ImageInput";
import { FormValues, SCHEMA } from "./types";
import useSubmit from "./useSubmit";

export default function AdditionalInformation() {
  const user = useGetter((state) => state.user);
  const { submit, isSuccess } = useSubmit();

  const methods = useForm<FormValues>({
    resolver: yupResolver(SCHEMA),
    defaultValues: {
      charityOverview: user.CharityOverview,
      charityLogo: [],
      charityBanner: [],
    },
  });

  if (isSuccess) {
    return <Redirect to={`${site.app}/${app.register}/${routes.dashboard}`} />;
  }

  return (
    <div className="flex flex-col gap-5 items-center">
      <Title />

      <FormProvider {...methods}>
        <form
          className="flex flex-col justify-center w-5/6 h-full gap-4"
          onSubmit={methods.handleSubmit(submit)}
        >
          <OrganizationName />
          <ImageInput
            name="charityBanner"
            label="Banner image of your organization"
          />
          <ImageInput name="charityLogo" label="Logo of your organization" />
          <DescriptionInput />
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
