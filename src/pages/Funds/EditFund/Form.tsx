import {
  ControlledImgEditor as ImgEditor,
  type ImgLink,
} from "components/ImgEditor";
import Prompt from "components/Prompt";
import { NativeField as Field, Form as Frm } from "components/form";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { getFullURL, uploadFiles } from "helpers/uploadFiles";
import type { SubmitHandler } from "react-hook-form";
import { useEditFundMutation } from "services/aws/funds";
import type { Fund } from "types/aws";
import { GoalSelector, MAX_SIZE_IN_BYTES, VALID_MIME_TYPES } from "../common";
import { FeatureBanner } from "./FeatureBanner";
import type { FV } from "./types";
import { useRhf } from "./useRhf";

export function Form({ classes = "", ...props }: Fund & { classes?: string }) {
  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();
  const rhf = useRhf(props);

  const [editFund, { isLoading: isEditingFund }] = useEditFundMutation();

  const onSubmit: SubmitHandler<FV> = async ({
    targetType,
    fixedTarget,
    logo,
    banner,
    ...fv
  }) => {
    try {
      const [bannerUrl, logoUrl] = await uploadImgs([banner, logo], () => {
        showModal(
          Prompt,
          { type: "loading", children: "Uploading images.." },
          { isDismissible: false }
        );
      });

      /// BUILD UPDATE ///
      const update: Fund.Update = {};

      if (rhf.dirtyFields.targetType || rhf.dirtyFields.fixedTarget) {
        update.target =
          targetType === "none"
            ? "0"
            : targetType === "smart"
              ? "smart"
              : (fixedTarget as `${number}`);
      }

      if (rhf.dirtyFields.banner) update.banner = bannerUrl;
      if (rhf.dirtyFields.logo) update.logo = logoUrl;
      if (rhf.dirtyFields.name) update.name = fv.name;
      if (rhf.dirtyFields.description) update.description = fv.description;

      await editFund({
        ...update,
        id: props.id,
      }).unwrap();
      showModal(Prompt, {
        type: "success",
        children: "Successfully updated fund!",
      });
    } catch (err) {
      handleError(err, { context: "updating fund" });
    }
  };

  return (
    <Frm
      onSubmit={rhf.handleSubmit(onSubmit)}
      disabled={rhf.isSubmitting}
      className={classes + " pb-4"}
    >
      <FeatureBanner
        isToggling={isEditingFund}
        fundId={props.id}
        featured={props.featured}
        onToggle={async () => {
          try {
            await editFund({
              id: props.id,
              featured: !props.featured,
            }).unwrap();
          } catch (err) {
            handleError(err, { context: "updating fund" });
          }
        }}
        classes="my-4"
      />

      <Field
        {...rhf.register("name")}
        label="Name"
        required
        error={rhf.errors.name?.message}
        classes={{ label: "font-medium text-base" }}
      />
      <Field
        type="textarea"
        {...rhf.register("description")}
        label="Description"
        required
        classes={{
          container: "mt-4",
          label: "font-medium text-base",
          input:
            "whitespace-pre-wrap supports-[field-sizing]:[field-sizing:content]",
        }}
        error={rhf.errors.description?.message}
      />

      <label className="text-lg font-medium block mb-2 mt-4">Logo</label>
      <ImgEditor
        disabled={rhf.isSubmitting}
        value={rhf.logo.value}
        onChange={(v) => {
          rhf.logo.onChange(v);
          rhf.trigger("logo.file");
        }}
        onUndo={(e) => {
          e.stopPropagation();
          rhf.resetField("logo");
        }}
        accept={VALID_MIME_TYPES}
        aspect={[1, 1]}
        classes={{ container: "w-80 aspect-[1/1]" }}
        maxSize={MAX_SIZE_IN_BYTES}
        error={rhf.errors.logo?.file?.message}
      />

      <label className="text-lg font-medium block mt-6 mb-2">Banner</label>
      <ImgEditor
        disabled={rhf.isSubmitting}
        value={rhf.banner.value}
        onChange={(v) => {
          rhf.banner.onChange(v);
          rhf.trigger("banner.file");
        }}
        onUndo={(e) => {
          e.stopPropagation();
          rhf.resetField("banner");
        }}
        accept={VALID_MIME_TYPES}
        aspect={[4, 1]}
        classes={{ container: "w-full aspect-[4/1]" }}
        maxSize={MAX_SIZE_IN_BYTES}
        error={rhf.errors.banner?.file?.message}
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
          {...rhf.register("fixedTarget", { shouldUnregister: true })}
          label="How much money do you want to raise?"
          classes="mt-2 mb-6"
          placeholder="$"
          error={rhf.errors.fixedTarget?.message}
        />
      )}

      <button
        disabled={!rhf.isDirty}
        type="submit"
        className="btn-blue text-sm font-medium px-4 py-2 justify-self-end"
      >
        Update fund
      </button>
    </Frm>
  );
}

async function uploadImgs(
  imgs: ImgLink[],
  onUpload: () => void
): Promise<string[]> {
  const files = imgs.flatMap((img) => (img.file ? [img.file] : []));
  if (files.length > 0) onUpload();
  const baseURL = await uploadFiles(files, "endow-profiles");
  return imgs.map((img) =>
    img.file && baseURL ? getFullURL(baseURL, img.file.name) : img.publicUrl
  );
}
