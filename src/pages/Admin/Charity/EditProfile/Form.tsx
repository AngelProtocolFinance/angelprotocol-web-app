import type { EndowDesignation } from "@better-giving/endowment";
import { Outlet } from "@remix-run/react";
import countries from "assets/countries/all.json";
import { ControlledCountrySelector as CountrySelector } from "components/CountrySelector";
import ExtLink from "components/ExtLink";
import Group from "components/Group";
import { ControlledImgEditor as ImgEditor } from "components/ImgEditor";
import PromptV2 from "components/Prompt";
import { RichText } from "components/RichText";
import { List, MultiList } from "components/Selector";
import { Confirmed, Info } from "components/Status";
import { ControlledToggle as Toggle } from "components/Toggle";
import { Form as F, NativeField as Field, Label } from "components/form";
import { appRoutes } from "constants/routes";
import { unsdgs } from "constants/unsdgs";
import Slug from "./Slug";
import { getSDGLabelValuePair } from "./getSDGLabelValuePair";
import { MAX_CHARS, bannerSpec, cardImgSpec, logoSpec } from "./schema";
import type { FV } from "./schema";
import useEditProfile from "./useEditProfile";
import useRhf from "./useRhf";

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

interface Props {
  initSlug?: string;
  init: FV;
  id: number;
}

export default function Form({ initSlug = "", init, id }: Props) {
  const { dirtyFields, handleSubmit, ...rhf } = useRhf(init);
  const { onSubmit, state, prompt, setPrompt } = useEditProfile(dirtyFields);
  const isUploading = [
    rhf.logo.value,
    rhf.card_img.value,
    rhf.banner.value,
  ].some((v) => v === "loading");

  return (
    <F
      disabled={rhf.isSubmitting || state !== "idle"}
      onReset={(e) => {
        e.preventDefault();
        rhf.reset();
      }}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl justify-self-center grid content-start gap-6 mt-6"
    >
      {prompt && <PromptV2 {...prompt} onClose={() => setPrompt(undefined)} />}
      <Group
        title="Public profile information"
        description="The following information will be used to populate your public
          profile."
      >
        <Field
          {...rhf.register("name")}
          classes="field-admin"
          label="Name of your organization"
          disabled
          tooltip="The name field reflects your organization's legal name as provided on your initial application. If you need to change your name please contact support@better.giving and provide documentation supporting the legal name change or D.B.A. records."
          error={rhf.errors.name?.message}
          required
        />
        <Field
          {...rhf.register("tagline")}
          classes="field-admin"
          name="tagline"
          label="Tagline of your organization"
          required
          error={rhf.errors.tagline?.message}
        />
        <Field
          {...rhf.register("registration_number")}
          classes="field-admin"
          name="registration_number"
          label="EIN / Registration#"
          error={rhf.errors.registration_number?.message}
          required
        />
        <Label className="-mb-4">Banner image of your organization</Label>
        <ImgEditor
          value={rhf.banner.value}
          onChange={(val) => {
            rhf.banner.onChange(val);
            // trigger validation - this opts for onChange validation instead of onSubmit
            rhf.trigger("image");
          }}
          onUndo={(e) => {
            e.stopPropagation();
            rhf.resetField("image");
          }}
          spec={bannerSpec}
          classes={{ container: "mb-4", dropzone: "w-full aspect-[4/1]" }}
          error={rhf.errors.image?.message}
        />
        <Label className="-mb-4">Logo of your organization</Label>
        <ImgEditor
          value={rhf.logo.value}
          onChange={(val) => {
            rhf.logo.onChange(val);
            rhf.trigger("logo");
          }}
          onUndo={(e) => {
            e.stopPropagation();
            rhf.resetField("logo");
          }}
          spec={logoSpec}
          classes={{
            container: "mb-4",
            dropzone: "w-28 sm:w-48 aspect-square",
          }}
          error={rhf.errors.logo?.message}
        />
        <Label className="-mb-4">
          Marketplace Card image for your organization
        </Label>
        <ImgEditor
          value={rhf.card_img.value}
          onChange={(val) => {
            rhf.card_img.onChange(val);
            rhf.trigger("card_img");
          }}
          onUndo={(e) => {
            e.stopPropagation();
            rhf.resetField("card_img");
          }}
          spec={cardImgSpec}
          classes={{
            container: "mb-4",
            dropzone: "w-full sm:w-96 aspect-[2/1]",
          }}
          error={rhf.errors.card_img?.message}
        />
        <Label className="-mb-4">Description of your organization</Label>
        <RichText
          ref={rhf.overview.ref}
          content={rhf.overview.value}
          onChange={rhf.overview.onChange}
          placeHolder="A short overview of your organization"
          charLimit={MAX_CHARS}
          classes={{
            field:
              "rich-text-toolbar border border-gray-l4 text-sm grid grid-rows-[auto_1fr] rounded bg-gray-l6 dark:bg-blue-d5 p-3 min-h-[15rem]",
            counter: "text-navy-l1 dark:text-navy-l2",
            error: "text-right",
          }}
          error={
            rhf.errors.overview?.value?.message ||
            rhf.errors.overview?.length?.message
          }
        />
        <p className="static field-error -mt-4 empty:hidden">
          {rhf.errors.overview?.message}
        </p>

        <Field
          {...rhf.register("url")}
          classes="field-admin"
          label="Website of your organization"
          placeholder="https://website.org"
          error={rhf.errors.url?.message}
        />

        <Slug
          initSlug={initSlug}
          newSlug={rhf.slug}
          slugField={
            <Field
              {...rhf.register("slug")}
              classes="field-admin"
              label="Custom Profile URL"
              placeholder="myNonprofit"
              error={rhf.errors.slug?.message}
            />
          }
        />
      </Group>

      <Group title="Organization">
        <Label className="-mb-4" required>
          Aligned SDG#
        </Label>
        <MultiList
          value={rhf.sdgs.value}
          onChange={rhf.sdgs.onChange}
          options={sdgOptions}
          classes={{ button: "field-input-admin", options: "text-sm" }}
          error={rhf.errors.sdgs?.message}
          onReset={() => rhf.resetField("sdgs")}
          ref={rhf.sdgs.ref}
        />
        <Label className="-mb-4" required>
          Organization Designation
        </Label>
        <List
          value={rhf.designation.value}
          onChange={rhf.designation.onChange}
          classes={{ options: "text-sm" }}
          options={endowDesignations.map((designation) => ({
            label: designation,
            value: designation,
          }))}
          error={rhf.errors.endow_designation?.message}
          ref={rhf.designation.ref}
        />
        <Label className="-mb-4" required>
          Headquarters
        </Label>
        <CountrySelector
          value={rhf.hqCountry.value}
          onChange={rhf.hqCountry.onChange}
          placeholder="Select a country"
          options={countries}
          classes={{
            container: "px-4 bg-gray-l6 dark:bg-blue-d5",
            input: "text-sm py-3.5",
            error: "field-error",
          }}
          error={rhf.errors.hq_country?.name?.message}
          ref={rhf.hqCountry.ref}
        />
        <Label className="-mb-4">Active countries</Label>
        <MultiList
          searchable
          value={rhf.activityCountries.value}
          onChange={rhf.activityCountries.onChange}
          ref={rhf.activityCountries.ref}
          onReset={() => rhf.resetField("active_in_countries")}
          options={countries.map((c) => ({
            label: c.name,
            value: c.name,
          }))}
          classes={{
            container: "bg-white dark:bg-blue-d6",
            button: "field-input-admin",
            options: "text-sm",
          }}
        />
        <Field
          {...rhf.register("street_address")}
          classes="field-admin"
          label="Address"
          error={rhf.errors.street_address?.message}
        />
      </Group>

      <Group title="Social Media">
        <Field
          {...rhf.register("social_media_urls.facebook")}
          classes="field-admin"
          label="Facebook"
          placeholder="https://facebook.com/"
          error={rhf.errors.social_media_urls?.facebook?.message}
        />
        <Field
          {...rhf.register("social_media_urls.linkedin")}
          classes="field-admin"
          label="LinkedIn"
          placeholder="https://linkedin.com/"
          error={rhf.errors.social_media_urls?.linkedin?.message}
        />
        <Field
          {...rhf.register("social_media_urls.twitter")}
          classes="field-admin"
          label="X (fka Twitter)"
          placeholder="https://x.com/"
          error={rhf.errors.social_media_urls?.twitter?.message}
        />
        <Field
          {...rhf.register("social_media_urls.instagram")}
          classes="field-admin"
          label="Instagram"
          placeholder="https://instagram.com/"
          error={rhf.errors.social_media_urls?.instagram?.message}
        />
        <Field
          {...rhf.register("social_media_urls.youtube")}
          classes="field-admin"
          label="YouTube"
          placeholder="https://youtube.com/"
          error={rhf.errors.social_media_urls?.youtube?.message}
        />
        <Field
          {...rhf.register("social_media_urls.tiktok")}
          classes="field-admin"
          label="Tiktok"
          placeholder="https://tiktok.com/"
          error={rhf.errors.social_media_urls?.tiktok?.message}
        />
        <Field
          {...rhf.register("social_media_urls.discord")}
          classes="field-admin"
          label="Discord"
          placeholder="https://discord.com/"
          error={rhf.errors.social_media_urls?.discord?.message}
        />
      </Group>

      <div
        className={`flex flex-wrap justify-between items-center border rounded p-3 gap-4 ${
          rhf.published.value
            ? "bg-green-l5 border-green-l2"
            : "bg-amber-l5 border-amber-l3"
        }`}
      >
        {rhf.published.value ? (
          <Confirmed>Your profile is visible in the marketplace</Confirmed>
        ) : (
          <Info classes="text-amber">
            Your profile is not visible in the marketplace
          </Info>
        )}
        <div className="flex items-center gap-x-2">
          <Toggle
            value={rhf.published.value}
            onChange={rhf.published.onChange}
            classes={{ container: "ml-auto text-sm" }}
            error={rhf.errors.published?.message}
          >
            Publish profile
          </Toggle>

          <ExtLink
            href={`${appRoutes.marketplace}/${id}`}
            className="text-blue-d1 hover:text-navy text-sm flex items-center gap-1"
          >
            View Profile
          </ExtLink>
        </div>
      </div>

      <div className="flex gap-3 group-disabled:hidden">
        <button
          disabled={!rhf.isDirty}
          type="reset"
          className="px-6 btn-outline-filled text-sm"
        >
          Reset changes
        </button>
        <button
          disabled={!rhf.isDirty || isUploading}
          type="submit"
          className="px-6 btn-blue text-sm"
        >
          Submit changes
        </button>
      </div>
      {/** success prompts */}
      <Outlet />
    </F>
  );
}
