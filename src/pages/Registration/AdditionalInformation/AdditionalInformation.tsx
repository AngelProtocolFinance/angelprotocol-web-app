import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { AdditionalInfoValues } from "../types";
import { useRegistrationQuery } from "services/aws/registration";
import Checkbox from "components/Checkbox";
import ImgEditor from "components/ImgEditor";
import { InputRow } from "../common";
import ButtonSection from "./ButtonSection";
import OverviewInput from "./OverviewInput";
import { VALID_MIME_TYPES, additionalInfoSchema } from "./additionalnfoSchema";
import useSubmit from "./useSubmit";

export default function AdditionalInformation() {
  const { charity } = useRegistrationQuery();
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

  return (
    <div className="flex flex-col gap-5 items-center w-full">
      <Title />

      <FormProvider {...methods}>
        <form
          className="flex flex-col justify-center w-5/6 h-full gap-4"
          onSubmit={methods.handleSubmit(submit)}
        >
          <OrganizationName />
          <Banner />
          <CharityLogo />
          <OverviewInput />
          <KycDonorsOnlyCheckbox />
          <ButtonSection />
        </form>
      </FormProvider>
    </div>
  );
}

const Title = () => (
  <h2 className="flex text-lg xl:text-xl font-semibold gap-2 items-center">
    Your logo and description will be used to populate your public profile
  </h2>
);

function KycDonorsOnlyCheckbox() {
  const {
    formState: { isSubmitting },
    register,
  } = useFormContext<AdditionalInfoValues>();

  return (
    <Checkbox {...register("kycDonorsOnly")} disabled={isSubmitting}>
      <span className="text-base">
        Only accept donations from donors who have provided their personal
        information(Name & address).
      </span>
    </Checkbox>
  );
}

function OrganizationName() {
  const { charity } = useRegistrationQuery();

  return (
    <InputRow htmlFor="charityName" label="Name of your organization">
      <span className="flex w-full font-bold">
        {charity.Registration.CharityName}
      </span>
    </InputRow>
  );
}

const Banner = () => (
  <div className="flex flex-col gap-2 w-full h-full">
    <label htmlFor="banner" className="cursor-pointer text-dark-grey text-left">
      Banner image of your organization
      <span className="ml-0.5 text-failed-red">*</span>
    </label>
    <ImgEditor<AdditionalInfoValues>
      name="banner"
      aspectRatioX={4}
      aspectRatioY={1}
      accept={VALID_MIME_TYPES}
    />
    <ImageSizeInfo limit="1MB" />
  </div>
);

const CharityLogo = () => (
  <div className="flex flex-col gap-2 w-full h-full">
    <label
      htmlFor="charityLogo"
      className="cursor-pointer text-dark-grey text-left"
    >
      Logo of your organization
      <span className="ml-0.5 text-failed-red">*</span>
    </label>
    <div className="w-32 h-32 sm:w-40 sm:h-40">
      <ImgEditor<AdditionalInfoValues>
        name="charityLogo"
        aspectRatioX={1}
        aspectRatioY={1}
        accept={VALID_MIME_TYPES}
      />
    </div>
    <ImageSizeInfo limit="1MB" />
  </div>
);

const ImageSizeInfo = ({ limit }: { limit: string }) => (
  <p className="text-xs -mt-5 text-left font-thin text-white/70">
    should be less than {limit}
  </p>
);
