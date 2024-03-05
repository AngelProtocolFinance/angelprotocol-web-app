import countries from "assets/countries/all.json";
import ActivityCountries from "components/ActivityCountries";
import CountrySelector from "components/CountrySelector";
import Group from "components/Group";
import Icon from "components/Icon";
import ImgEditor from "components/ImgEditor";
import { RichTextEditor } from "components/RichText";
import { MultiSelector, Selector } from "components/Selector";
import Toggle from "components/Toggle";
import { Field, Label } from "components/form";
import { appRoutes } from "constants/routes";
import { unsdgs } from "constants/unsdgs";
import { Link } from "react-router-dom";
import { EndowDesignation } from "types/aws";
import { UNSDG_NUMS } from "types/lists";
import { getSDGLabelValuePair } from "./getSDGLabelValuePair";
import { MAX_CHARS, MAX_SIZE_IN_BYTES, VALID_MIME_TYPES } from "./schema";
import { FV } from "./types";
import useEditProfile from "./useEditProfile";

const sdgOptions = Object.entries(unsdgs).map(([key, { title }]) =>
  getSDGLabelValuePair(key, title)
);

const endowDesignations: EndowDesignation[] = [
  "Charity",
  "Religious Organization",
  "University",
  "Hospital",
  "Other",
];

export default function Form() {
  const { isSubmitting, id, editProfile, reset } = useEditProfile();
  return (
    <form
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
      onSubmit={editProfile}
      className="w-full max-w-4xl justify-self-center grid content-start gap-6 mt-6"
    >
      <Link
        to={`${appRoutes.marketplace}/${id}`}
        className="text-blue hover:text-orange text-sm flex items-center gap-1"
      >
        <Icon type="Back" />
        <span>Back to profile</span>
      </Link>
      <Toggle<FV> name="published" classes={{ container: "ml-auto text-sm" }}>
        Publish profile
      </Toggle>
      <Group
        title="Public profile information"
        description="The following information will be used to populate your public
          profile."
      >
        <Field<FV>
          classes="field-admin"
          name="name"
          label="Name of your organization"
          required
        />
        <Field<FV>
          classes="field-admin"
          name="tagline"
          label="Tagline of your organization"
          required
        />
        <Field<FV>
          classes="field-admin"
          name="registration_number"
          label="Organization’s registration number"
        />
        <Label className="-mb-4">Banner image of your organization</Label>
        <ImgEditor<FV, "image">
          name="image"
          accept={VALID_MIME_TYPES}
          aspect={[4, 1]}
          classes={{ container: "mb-4", dropzone: "w-full aspect-[4/1]" }}
        />
        <Label className="-mb-4">Logo of your organization</Label>
        <ImgEditor<FV, "logo">
          name="logo"
          accept={VALID_MIME_TYPES}
          aspect={[1, 1]}
          classes={{
            container: "mb-4",
            dropzone: "w-28 sm:w-48 aspect-square",
          }}
          maxSize={MAX_SIZE_IN_BYTES}
        />
        <Label className="-mb-4">
          Marketplace Card image for your organization
        </Label>
        <ImgEditor<FV, "card_img">
          name="card_img"
          accept={VALID_MIME_TYPES}
          aspect={[2, 1]}
          classes={{
            container: "mb-4",
            dropzone: "w-full aspect-[2/1]",
          }}
        />
        <Label className="-mb-4">Description of your organization</Label>
        <RichTextEditor<FV>
          fieldName="overview"
          placeHolder="A short overview of your organization"
          charLimit={MAX_CHARS}
          classes={{
            container:
              "rich-text-toolbar border border-gray-l4 text-sm grid grid-rows-[auto_1fr] rounded bg-gray-l6 dark:bg-blue-d5 p-3 min-h-[15rem]",
            error: "static field-error -mt-4",
            charCounter: "text-gray-d1 dark:text-gray",
          }}
        />
        <Field<FV>
          classes="field-admin"
          name="url"
          label="Website of your organization"
          placeholder="https://website.org"
        />
      </Group>

      <Group title="Organization">
        <Label className="-mb-4" required>
          Aligned SDG#
        </Label>
        <MultiSelector<FV, "sdgs", UNSDG_NUMS>
          name="sdgs"
          options={sdgOptions}
          classes={{ button: "field-input-admin" }}
        />
        <Label className="-mb-4" required>
          Organization Designation
        </Label>
        <Selector<FV, "endow_designation", string>
          name="endow_designation"
          options={endowDesignations.map((designation) => ({
            label: designation,
            value: designation,
          }))}
        />
        <Label className="-mb-4">Headquarters</Label>
        <CountrySelector<FV, "hq_country">
          placeholder="Select a country"
          fieldName="hq_country"
          countries={countries}
          classes={{
            container: "px-4 bg-gray-l6 dark:bg-blue-d5",
            input: "text-sm py-3.5",
            error: "field-error",
          }}
        />
        <Label className="-mb-4">Active countries</Label>
        <ActivityCountries<FV, "active_in_countries">
          name="active_in_countries"
          classes={{
            container: "bg-white dark:bg-blue-d6",
            button: "field-input-admin",
          }}
        />
        <Field<FV>
          classes="field-admin"
          name="street_address"
          label="Address"
        />
      </Group>

      <Group title="Social Media">
        <Field<FV>
          classes="field-admin"
          name="social_media_urls.facebook"
          label="Facebook"
          placeholder="https://facebook.com/"
        />
        <Field<FV>
          classes="field-admin"
          name="social_media_urls.linkedin"
          label="Linkedin"
          placeholder="https://linkedin.com/"
        />
        <Field<FV>
          classes="field-admin"
          name="social_media_urls.twitter"
          label="Twitter"
          placeholder="https://twitter.com/"
        />
        <Field<FV>
          classes="field-admin"
          name="social_media_urls.discord"
          label="Discord"
          placeholder="https://discord.com/"
        />
        <Field<FV>
          classes="field-admin"
          name="social_media_urls.instagram"
          label="Instagram"
          placeholder="https://instagram.com/"
        />
        <Field<FV>
          classes="field-admin"
          name="social_media_urls.youtube"
          label="YouTube"
          placeholder="https://youtube.com/"
        />
        <Field<FV>
          classes="field-admin"
          name="social_media_urls.tiktok"
          label="Tiktok"
          placeholder="https://tiktok.com/"
        />
      </Group>

      <div className="flex gap-3 group-disabled:hidden">
        <button
          disabled={isSubmitting}
          type="reset"
          className="px-6 btn-outline-filled text-sm"
        >
          Reset changes
        </button>
        <button
          disabled={isSubmitting}
          type="submit"
          className="px-6 btn-orange text-sm"
        >
          Submit changes
        </button>
      </div>
    </form>
  );
}
