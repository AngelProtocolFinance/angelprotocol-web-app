import { yupResolver } from "@hookform/resolvers/yup";
import { app, site } from "constants/routes";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetter } from "store/accessors";
import { InputRow } from "../common";
import routes from "../routes";
import ButtonSection from "./ButtonSection";
import OverviewInput from "./OverviewInput";
import ImageInput from "./ImageInput";
import { FormValues, SCHEMA } from "./types";
import useSubmit from "./useSubmit";

export default function AdditionalInformation() {
  const navigate = useNavigate();
  const user = useGetter((state) => state.user);
  const { submit, isSuccess } = useSubmit();

  const methods = useForm<FormValues>({
    resolver: yupResolver(SCHEMA),
    defaultValues: {
      charityBanner: [user.Metadata.Banner],
      charityOverview: user.Metadata.CharityOverview,
      charityLogo: [user.Metadata.CharityLogo],
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate(`${site.app}/${app.register}/${routes.dashboard}`);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex flex-col gap-5 items-center w-full">
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
          <OverviewInput />
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
    <InputRow htmlFor="charityName" label="Name of your organization">
      <span className="flex w-full font-bold">{user.CharityName}</span>
    </InputRow>
  );
}
