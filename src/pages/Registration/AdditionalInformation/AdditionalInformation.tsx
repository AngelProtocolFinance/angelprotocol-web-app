import { yupResolver } from "@hookform/resolvers/yup";
import { ForwardedRef, forwardRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AdditionalInfoValues } from "../types";
import { useRegistrationState } from "services/aws/registration";
import Checkbox, { CheckboxProps } from "components/Checkbox";
import { InputRow } from "../common";
import ButtonSection from "./ButtonSection";
import ImageInput from "./ImageInput";
import OverviewInput from "./OverviewInput";
import { additionalInfoSchema } from "./additionalnfoSchema";
import useSubmit from "./useSubmit";

export default function AdditionalInformation() {
  const { data } = useRegistrationState("old");
  const charity = data!; //ensured by guard
  const { submit } = useSubmit();

  const methods = useForm<AdditionalInfoValues>({
    resolver: yupResolver(additionalInfoSchema),
    defaultValues: {
      banner: charity.Metadata.Banner,
      charityOverview: charity.Metadata.CharityOverview,
      charityLogo: charity.Metadata.CharityLogo,
      kycDonorsOnly: charity.Metadata.KycDonorsOnly,
    },
  });
  const {
    register,
    formState: { isSubmitting },
  } = methods;

  return (
    <div className="flex flex-col gap-5 items-center w-full">
      <Title />

      <FormProvider {...methods}>
        <form
          className="flex flex-col justify-center w-5/6 h-full gap-4"
          onSubmit={methods.handleSubmit(submit)}
        >
          <OrganizationName value={charity.Registration.CharityName} />
          <ImageInput name="banner" label="Banner image of your organization" />
          <ImageSizeInfo limit="1MB" />
          <ImageInput name="charityLogo" label="Logo of your organization" />
          <ImageSizeInfo limit="1MB" />
          <OverviewInput />
          <KycDonorsOnlyCheckbox
            disabled={isSubmitting}
            {...register("kycDonorsOnly")}
          />
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

const ImageSizeInfo = (props: { limit: string }) => (
  <p className="text-xs -mt-5 text-left font-thin text-white/70">
    should be less than {props.limit}
  </p>
);

const KycDonorsOnlyCheckbox = forwardRef(
  (props: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) => (
    <Checkbox {...props} ref={ref}>
      <span className="text-base">Only accept donations from KYC Donors.</span>
    </Checkbox>
  )
);

const OrganizationName = ({ value }: { value: string }) => (
  <InputRow htmlFor="charityName" label="Name of your organization">
    <span className="flex w-full font-bold">{value}</span>
  </InputRow>
);
