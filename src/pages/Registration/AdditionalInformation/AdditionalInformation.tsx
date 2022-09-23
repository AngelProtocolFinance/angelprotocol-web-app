import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { AdditionalInfoValues } from "../types";
import { useRegistrationQuery } from "services/aws/registration";
import Checkbox from "components/Checkbox";
import ImgEditor from "components/ImgEditor";
import RichTextEditor from "components/RichTextEditor";
import InputColumn from "../common/InputColumn";
import ButtonSection from "./ButtonSection";
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
          className="flex flex-col justify-center w-5/6 h-full gap-10"
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
    <InputColumn htmlFor="charityName" label="Name of your organization">
      <span className="flex w-full font-bold">
        {charity.Registration.CharityName}
      </span>
    </InputColumn>
  );
}

const Banner = () => (
  <InputColumn
    htmlFor="banner"
    label="Banner image of your organization"
    required
  >
    <div className="flex flex-col gap-2">
      <ImgEditor<AdditionalInfoValues>
        name="banner"
        aspectRatioX={4}
        aspectRatioY={1}
        accept={VALID_MIME_TYPES}
        className="h-20 sm:h-40 w-[20rem] sm:w-[40rem]"
      />
      <ImageSizeInfo limit="1MB" />
    </div>
  </InputColumn>
);

const CharityLogo = () => (
  <InputColumn htmlFor="charityLogo" label="Logo of your organization" required>
    <div className="flex flex-col gap-2">
      <ImgEditor<AdditionalInfoValues>
        name="charityLogo"
        aspectRatioX={1}
        aspectRatioY={1}
        accept={VALID_MIME_TYPES}
        className="h-20 sm:h-40 w-20 sm:w-40"
      />
      <ImageSizeInfo limit="1MB" />
    </div>
  </InputColumn>
);

const ImageSizeInfo = ({ limit }: { limit: string }) => (
  <p className="text-xs -mt-5 text-left font-thin text-white/70">
    should be less than {limit}
  </p>
);

function OverviewInput() {
  return (
    <InputColumn
      htmlFor="charityOverview"
      label="Description of your organization"
      required
    >
      <RichTextEditor<AdditionalInfoValues>
        fieldName="charityOverview"
        classes={{
          container:
            "text-white/80 p-3 rounded-md bg-white/10 shadow-inner w-full text-left",
          error: "text-sm text-failed-red ml-1",
        }}
        placeHolder="an overview of your organization"
      />
    </InputColumn>
  );
}
