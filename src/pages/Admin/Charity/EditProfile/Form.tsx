import { Link } from "react-router-dom";
import { FormValues as FV } from "./types";
import { UNSDG_NUMS } from "types/lists";
import CountrySelector from "components/CountrySelector";
import Icon from "components/Icon";
import ImgEditor from "components/ImgEditor";
import { RichTextEditor } from "components/RichText";
import { Selector } from "components/Selector";
import {
  FormContainer,
  GroupContainer,
  Submitter,
  TextPrim,
  TextSec,
  errorStyle,
} from "components/admin";
import { Label } from "components/form";
import { appRoutes } from "constants/routes";
import { unsdgs } from "constants/unsdgs";
import ActivityCountries from "./ActivityCountries";
import { getSDGLabelValuePair } from "./getSDGLabelValuePair";
import { VALID_MIME_TYPES } from "./schema";
import useEditProfile from "./useEditProfile";

const sdgOptions = Object.entries(unsdgs).map(([key, { title }]) =>
  getSDGLabelValuePair(key, title)
);

export default function Form() {
  const { editProfile, isSubmitting, id } = useEditProfile();
  return (
    <FormContainer
      onSubmit={editProfile}
      className="max-w-4xl justify-self-center mt-6"
    >
      <Link
        to={`${appRoutes.profile}/${id}`}
        className="text-blue hover:text-orange text-sm flex items-center gap-1"
      >
        <Icon type="Back" />
        <span>Back to profile</span>
      </Link>
      <Label className="-mb-4" required>
        Banner
      </Label>
      <ImgEditor<FV, "image">
        name="image"
        accept={VALID_MIME_TYPES}
        aspect={[4, 1]}
        classes="w-full aspect-[4/1] mb-4 rounded border border-prim"
      />
      <Label className="-mb-4" required>
        Logo
      </Label>
      <ImgEditor<FV, "logo">
        name="logo"
        accept={VALID_MIME_TYPES}
        aspect={[1, 1]}
        classes="w-28 sm:w-48 aspect-square mb-4 rounded border border-prim"
      />
      <Label className="-mb-4">SDG#</Label>
      <Selector<FV, "categories_sdgs", UNSDG_NUMS, true>
        multiple
        name="categories_sdgs"
        options={sdgOptions}
      />
      <TextPrim<FV> name="name" label="Charity Name" />
      <TextPrim<FV>
        name="tagline"
        label="Tagline of your organization"
        required
      />
      <TextPrim<FV> name="registration_number" label="Registration number" />
      <TextPrim<FV> name="street_address" label="Street address" />
      <Label className="-mb-4" required>
        Country
      </Label>

      <CountrySelector<FV, "hq_country">
        placeholder="Select a country"
        fieldName="hq_country"
        classes={{
          container:
            "px-4 border border-prim rounded focus-within:border-gray-d1 focus-within:dark:border-blue-l2 bg-orange-l6 dark:bg-blue-d7",
          input:
            "text-sm py-3.5 w-full placeholder:text-sm placeholder:text-gray-d1 dark:placeholder:text-gray focus:outline-none bg-transparent",
          error: errorStyle,
        }}
      />
      <ActivityCountries />
      <TextPrim<FV> name="hq_city" label="City" required />
      <Label className="-mb-4">Overview</Label>
      <RichTextEditor<FV>
        fieldName="overview"
        placeHolder="A short overview of your charity"
        classes={{
          container:
            "rich-text-toolbar border border-prim text-sm grid grid-rows-[auto_1fr] rounded bg-orange-l6 dark:bg-blue-d7 p-3",
          error: "text-right text-red dark:text-red-l1 text-xs -mt-4",
          charCounter: "text-gray-d1 dark:text-gray",
        }}
      />

      <Label className="-mb-4 font-bold">Social Media</Label>
      <GroupContainer>
        <TextSec<FV>
          name="url"
          label="Website"
          placeholder="https://website.org"
        />
        <TextSec<FV>
          name="social_media_url_facebook"
          label="Facebook"
          placeholder="https://facebook.com/"
        />
        <TextSec<FV>
          name="social_media_url_twitter"
          label="Twitter"
          placeholder="https://twitter.com/"
        />
        <TextSec<FV>
          name="social_media_url_linkedin"
          label="Linkedin"
          placeholder="https://linkedin.com/"
        />
      </GroupContainer>

      <TextPrim<FV>
        name="contact_email"
        label="Contact email"
        disabled={true}
      />

      <Submitter disabled={isSubmitting} type="submit">
        Submit
      </Submitter>
    </FormContainer>
  );
}
