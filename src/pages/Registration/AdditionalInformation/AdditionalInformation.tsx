import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { AdditionalInfoValues } from "../types";
import { FileObject } from "types/aws";
import { useRegistrationQuery } from "services/aws/registration";
import Checkbox from "components/Checkbox";
import ImgEditor, { ImgLink } from "components/ImgEditor";
import { RichTextEditor } from "components/RichText";
import InputColumn from "../common/InputColumn";
import ButtonSection from "./ButtonSection";
import { VALID_MIME_TYPES, additionalInfoSchema } from "./additionalnfoSchema";
import useSubmit from "./useSubmit";

export default function AdditionalInformation() {
  const { application } = useRegistrationQuery();
  const { submit } = useSubmit();

  const methods = useForm<AdditionalInfoValues>({
    resolver: yupResolver(additionalInfoSchema),
    defaultValues: {
      //convert to editor format
      banner: toImgLink(application.Metadata.Banner),
      charityLogo: toImgLink(application.Metadata.Logo),
      charityOverview: application.Metadata.Overview,
      kycDonorsOnly: application.Metadata.KycDonorsOnly,
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
          <Logo />
          <OverviewInput />
          <Checkbox<AdditionalInfoValues> name="kycDonorsOnly">
            <span className="text-base">
              Only accept donations from donors who have provided their personal
              information(Name & address).
            </span>
          </Checkbox>
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

function OrganizationName() {
  const { application } = useRegistrationQuery();

  return (
    <InputColumn htmlFor="name" label="Name of your organization">
      <span className="flex w-full font-bold">
        {application.Registration.OrganizationName}
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
      <ImgEditor<AdditionalInfoValues, "banner">
        name="banner"
        aspect={[4, 1]}
        accept={VALID_MIME_TYPES}
        classes="w-[20rem] sm:w-[40rem] aspect-[4/1] border-2 border-white/20 rounded-md"
      />
      <ImageSizeInfo limit="1MB" />
    </div>
  </InputColumn>
);

const Logo = () => (
  <InputColumn htmlFor="logo" label="Logo of your organization" required>
    <div className="flex flex-col gap-2">
      <ImgEditor<AdditionalInfoValues, "charityLogo">
        name="charityLogo"
        aspect={[1, 1]}
        accept={VALID_MIME_TYPES}
        classes="sm:h-40 w-20 sm:w-40 aspect-[1/1] border-2 border-white/20 rounded-md"
      />
      <ImageSizeInfo limit="1MB" />
    </div>
  </InputColumn>
);

const ImageSizeInfo = ({ limit }: { limit: string }) => (
  <p className="text-xs text-left font-thin text-white/70">
    should be less than {limit}
  </p>
);

function OverviewInput() {
  return (
    <InputColumn
      htmlFor="overview"
      label="Description of your organization"
      required
    >
      <RichTextEditor<AdditionalInfoValues>
        fieldName="charityOverview"
        classes={{
          container:
            "text-white/80 p-3 rounded-md bg-white/10 shadow-inner w-full text-left",
          error: "text-sm text-red ml-1",
        }}
        placeHolder="an overview of your organization"
      />
    </InputColumn>
  );
}

function toImgLink(file?: FileObject): ImgLink {
  if (file) {
    return { ...file, preview: file.publicUrl };
  } else {
    return { name: "", preview: "", publicUrl: "" };
  }
}
