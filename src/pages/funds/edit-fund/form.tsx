import type { FundUpdate, SingleFund } from "@better-giving/fundraiser";
import { useFetcher } from "@remix-run/react";
import { NativeField as Field, Form as Frm } from "components/form";
import { GoalSelector } from "components/goal-selector";
import { ControlledImgEditor as ImgEditor } from "components/img-editor";
import { RichText } from "components/rich-text";
import { useActionResult } from "hooks/use-action-result";
import type { SubmitHandler } from "react-hook-form";
import { imgSpec } from "../common";
import { Videos } from "../common/videos";
import { type FV, MAX_DESCRIPTION_CHARS } from "./schema";
import Slug from "./slug";
import { useRhf } from "./use-rhf";

interface Props {
  classes?: string;
  initSlug?: string;
}

export function Form({
  classes = "",
  initSlug = "",
  ...props
}: SingleFund & Props) {
  const fetcher = useFetcher();
  useActionResult(fetcher.data);
  const { dirtyFields: df, ...rhf } = useRhf(props);

  const isSubmitting = fetcher.state !== "idle";
  const isUploading =
    rhf.banner.value === "loading" || rhf.logo.value === "loading";
  const isClosingFund = isSubmitting && !!(fetcher.json as any).close;

  const onSubmit: SubmitHandler<FV> = async ({ target, ...fv }) => {
    /// BUILD UPDATE ///
    const update: FundUpdate = {};

    if (df.banner) update.banner = fv.banner;
    if (df.logo) update.logo = fv.logo;

    if (df.target) {
      update.target =
        target.type === "none"
          ? "0"
          : target.type === "smart"
            ? "smart"
            : target.value;
    }

    if (df.name) update.name = fv.name;
    if (df.description) update.description = fv.description.value;
    if (df.videos) update.videos = fv.videos.map((v) => v.url);

    if (df.slug) {
      // TODO!
      // const result = await getFund(fv.slug);
      // if (result && result.id) {
      //   return;
      // }
      update.slug = fv.slug;
    }

    fetcher.submit(update, {
      method: "POST",
      encType: "application/json",
    });
  };

  return (
    <Frm
      onSubmit={rhf.handleSubmit(onSubmit)}
      disabled={isSubmitting}
      className={classes + " pb-4"}
    >
      <Field
        {...rhf.register("name")}
        label="Name"
        required
        error={rhf.errors.name?.message}
        classes={{ label: "font-medium text-base" }}
      />
      <label className="label font-medium mt-4 mb-1" data-required>
        Description
      </label>
      <RichText
        ref={rhf.desc.ref}
        content={rhf.desc.value}
        onChange={rhf.desc.onChange}
        placeHolder="A short overview of your fundraiser"
        charLimit={MAX_DESCRIPTION_CHARS}
        classes={{
          field:
            "rich-text-toolbar border border-gray-l3 text-sm grid grid-rows-[auto_1fr] rounded-sm bg-gray-l6 dark:bg-blue-d5 p-3 min-h-[15rem]",
          counter: "text-gray dark:text-gray",
          error: "text-right",
        }}
        error={
          rhf.errors.description?.value?.message ||
          rhf.errors.description?.length?.message
        }
      />
      <Slug
        initSlug={initSlug}
        newSlug={rhf.slug}
        slugField={
          <Field
            {...rhf.register("slug")}
            label="Custom Fundraiser URL"
            placeholder="myFundraiser"
            error={rhf.errors.slug?.message}
          />
        }
      />
      <Videos {...rhf.videos} classes="mt-4 mb-8" />
      <label className="text-lg font-medium block mb-2 mt-4">Logo</label>
      <ImgEditor
        disabled={isSubmitting}
        value={rhf.logo.value}
        onChange={(v) => {
          rhf.logo.onChange(v);
          rhf.trigger("logo");
        }}
        onUndo={(e) => {
          e.stopPropagation();
          rhf.resetField("logo");
        }}
        spec={imgSpec([1, 1])}
        classes={{ container: "w-80 aspect-1/1" }}
        error={rhf.errors.logo?.message}
      />

      <label className="text-lg font-medium block mt-6 mb-2">Banner</label>
      <ImgEditor
        disabled={isSubmitting}
        value={rhf.banner.value}
        onChange={(v) => {
          rhf.banner.onChange(v);
          rhf.trigger("banner");
        }}
        onUndo={(e) => {
          e.stopPropagation();
          rhf.resetField("banner");
        }}
        spec={imgSpec([4, 1])}
        classes={{ container: "w-full aspect-4/1" }}
        error={rhf.errors.banner?.message}
      />

      <label className="block mt-4 font-medium">
        Fundraiser goal <span className="text-red">*</span>
      </label>
      <GoalSelector
        classes="mt-2 mb-2"
        value={rhf.targetType.value}
        onChange={rhf.targetType.onChange}
      />
      {rhf.targetType.value === "fixed" && (
        <Field
          {...rhf.register("target.value", { shouldUnregister: true })}
          label="How much money do you want to raise?"
          classes="mt-2 mb-6"
          placeholder="$"
          error={rhf.errors?.target?.value?.message}
        />
      )}

      <div className="flex items-center justify-end gap-4 mt-4 mb-8">
        <button
          onClick={async () => {
            const fundNameConfirmation = window.prompt(
              "Type the name of this fund to confirm"
            );
            if (!fundNameConfirmation) return;
            if (fundNameConfirmation !== props.name) {
              return window.alert("Fund not closed: name is not confirmed");
            }

            fetcher.submit(
              { close: true },
              { action: ".", method: "POST", encType: "application/json" }
            );
          }}
          type="button"
          className="btn btn-red text-sm font-medium px-4 py-2 justify-self-end"
        >
          {isClosingFund ? "Closing.." : "Close fund"}
        </button>
        <button
          disabled={
            !rhf.isDirty || rhf.isUploading || isSubmitting || isUploading
          }
          type="submit"
          className="btn btn-blue text-sm font-medium px-4 py-2 justify-self-end"
        >
          Update fund
        </button>
      </div>
    </Frm>
  );
}
