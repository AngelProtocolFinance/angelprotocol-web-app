import type { EndowDesignation } from "@better-giving/endowment";
import type { OrgDesignation } from "@better-giving/schemas";
import { Combo } from "components/combo";
import { Form as F, Field, Label, UrlInput } from "components/form";
import { Group } from "components/group";
import { DrawerIcon } from "components/icon";
import { ImgEditor } from "components/img-editor";
import { Prompt } from "components/prompt";
import { RichText } from "components/rich-text";
import { MultiCombo } from "components/selector/multi-combo";
import { Select } from "components/selector/select";
import { Confirmed, Info } from "components/status";
import { Toggle } from "components/toggle";
import { countries, country_names } from "constants/countries";
import { unsdgs } from "constants/unsdgs";
import { Link, Outlet, href } from "react-router";
import { MAX_CHARS, bannerSpec, cardImgSpec, logoSpec } from "./schema";
import type { FV } from "./schema";
import { Slug } from "./slug";
import { use_edit_npo } from "./use-edit-profile";
import useRhf from "./use-rhf";

const endowDesignations: EndowDesignation[] = [
  "Charity",
  "Religious Organization",
  "University",
  "Hospital",
  "Other",
];

interface Props {
  init_slug?: string;
  init: FV;
  id: number;
  base_url: string;
}

export function Form({ init_slug = "", init, id, base_url }: Props) {
  const { dirtyFields, handleSubmit, ...rhf } = useRhf(init);
  const { onSubmit, state, prompt, set_prompt } = use_edit_npo(dirtyFields);
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
      className="w-full max-w-4xl grid content-start gap-6"
    >
      {prompt && <Prompt {...prompt} onClose={() => set_prompt(undefined)} />}
      <Group
        title="Public profile information"
        description="The following information will be used to populate your public
          profile."
      >
        <Field
          {...rhf.register("name")}
          label="Name of your organization"
          disabled
          tooltip="The name field reflects your organization's legal name as provided on your initial application. If you need to change your name please contact support@better.giving and provide documentation supporting the legal name change or D.B.A. records."
          error={rhf.errors.name?.message}
          required
        />
        <Field
          {...rhf.register("tagline")}
          name="tagline"
          label="Tagline of your organization"
          required
          error={rhf.errors.tagline?.message}
        />
        <Field
          {...rhf.register("registration_number")}
          name="registration_number"
          label="EIN / Registration#"
          error={rhf.errors.registration_number?.message}
          required
        />
        <Label className="-mb-4">Banner image of your organization</Label>
        <ImgEditor
          value={rhf.banner.value}
          on_change={(val) => {
            rhf.banner.onChange(val);
            // trigger validation - this opts for onChange validation instead of onSubmit
            rhf.trigger("image");
          }}
          on_undo={(e) => {
            e.stopPropagation();
            rhf.resetField("image");
          }}
          spec={bannerSpec}
          classes={{ container: "mb-4", dropzone: "w-full aspect-4/1" }}
          error={rhf.errors.image?.message}
        />
        <Label className="-mb-4">Logo of your organization</Label>
        <ImgEditor
          value={rhf.logo.value}
          on_change={(val) => {
            rhf.logo.onChange(val);
            rhf.trigger("logo");
          }}
          on_undo={(e) => {
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
          on_change={(val) => {
            rhf.card_img.onChange(val);
            rhf.trigger("card_img");
          }}
          on_undo={(e) => {
            e.stopPropagation();
            rhf.resetField("card_img");
          }}
          spec={cardImgSpec}
          classes={{
            container: "mb-4",
            dropzone: "w-full sm:w-96 aspect-2/1",
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
              "rich-text-toolbar border border-gray-l3 text-sm grid grid-rows-[auto_1fr] rounded-sm bg-gray-l6 dark:bg-blue-d5 p-3 min-h-[15rem]",
            counter: "text-gray dark:text-gray",
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

        <UrlInput
          {...rhf.register("url")}
          label="Website of your organization"
          placeholder="website.org"
          error={rhf.errors.url?.message}
        />

        <Slug
          base_url={base_url}
          init_slug={init_slug}
          new_slug={rhf.slug}
          slug_field={
            <Field
              {...rhf.register("slug")}
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

        <MultiCombo
          values={rhf.sdgs.value}
          on_change={rhf.sdgs.onChange}
          options={Object.keys(unsdgs)}
          classes={{ options: "text-sm" }}
          error={rhf.errors.sdgs?.message}
          on_reset={() => rhf.resetField("sdgs")}
          ref={rhf.sdgs.ref}
          option_disp={(sdg) => `${sdg} - ${(unsdgs as any)[sdg].title}`}
        />
        <Select<OrgDesignation>
          required
          label="Organization Designation"
          value={rhf.designation.value}
          onChange={rhf.designation.onChange}
          classes={{ options: "text-sm" }}
          options={endowDesignations}
          error={rhf.errors.endow_designation?.message}
          ref={rhf.designation.ref}
          option_disp={(v) => v}
        />

        <Combo
          required
          classes={{ input: "pl-12" }}
          label="Headquarters"
          value={rhf.hqCountry.value}
          onChange={rhf.hqCountry.onChange}
          placeholder="Select a country"
          options={country_names}
          error={rhf.errors.hq_country?.message}
          ref={rhf.hqCountry.ref}
          option_disp={(c) => (
            <>
              <span className="text-2xl">{countries[c].flag}</span>
              <span>{c}</span>
            </>
          )}
          btn_disp={(c, open) => {
            const flag = countries[c]?.flag;
            return flag ? (
              <span data-flag className="text-2xl">
                {flag}
              </span>
            ) : (
              <DrawerIcon
                isOpen={open}
                size={20}
                className="justify-self-end dark:text-gray shrink-0"
              />
            );
          }}
        />
        <Label className="-mb-4">Active countries</Label>
        <MultiCombo
          searchable
          values={rhf.activityCountries.value}
          on_change={rhf.activityCountries.onChange}
          ref={rhf.activityCountries.ref}
          on_reset={() => rhf.resetField("active_in_countries")}
          options={country_names}
          classes={{
            container: "bg-white dark:bg-blue-d6",
            options: "text-sm",
          }}
          option_disp={(c) => c}
        />
        <Field
          {...rhf.register("street_address")}
          label="Address"
          error={rhf.errors.street_address?.message}
        />
      </Group>

      <Group title="Social Media">
        <UrlInput
          {...rhf.register("social_media_urls.facebook")}
          label="Facebook"
          placeholder="facebook.com/"
          error={rhf.errors.social_media_urls?.facebook?.message}
        />
        <UrlInput
          {...rhf.register("social_media_urls.linkedin")}
          label="LinkedIn"
          placeholder="linkedin.com/"
          error={rhf.errors.social_media_urls?.linkedin?.message}
        />
        <UrlInput
          {...rhf.register("social_media_urls.twitter")}
          label="X (fka Twitter)"
          placeholder="x.com/"
          error={rhf.errors.social_media_urls?.twitter?.message}
        />
        <UrlInput
          {...rhf.register("social_media_urls.instagram")}
          label="Instagram"
          placeholder="instagram.com/"
          error={rhf.errors.social_media_urls?.instagram?.message}
        />
        <UrlInput
          {...rhf.register("social_media_urls.youtube")}
          label="YouTube"
          placeholder="youtube.com/"
          error={rhf.errors.social_media_urls?.youtube?.message}
        />
        <UrlInput
          {...rhf.register("social_media_urls.tiktok")}
          label="Tiktok"
          placeholder="tiktok.com/"
          error={rhf.errors.social_media_urls?.tiktok?.message}
        />
        <UrlInput
          {...rhf.register("social_media_urls.discord")}
          label="Discord"
          placeholder="discord.com/"
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

          <Link
            target="_blank"
            to={href("/marketplace/:id", { id: id.toString() })}
            className="text-blue-d1 hover:text-gray-d1 text-sm flex items-center gap-1"
          >
            View Profile
          </Link>
        </div>
      </div>

      <div className="flex gap-3 group-disabled:hidden">
        <button
          disabled={!rhf.isDirty}
          type="reset"
          className="px-6 btn-outline btn text-sm"
        >
          Reset changes
        </button>
        <button
          disabled={!rhf.isDirty || isUploading}
          type="submit"
          className="px-6 btn btn-blue text-sm"
        >
          Submit changes
        </button>
      </div>
      {/** success prompts */}
      <Outlet />
    </F>
  );
}
