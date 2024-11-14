import type { SingleFund } from "@better-giving/fundraiser";
import type { FundUpdate } from "@better-giving/fundraiser/schema";
import { ControlledImgEditor as ImgEditor } from "components/ImgEditor";
import Prompt from "components/Prompt";
import { NativeField as Field, Form as Frm } from "components/form";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { uploadFile } from "helpers/uploadFile";
import type { SubmitHandler } from "react-hook-form";
import { useCloseFundMutation, useEditFundMutation } from "services/aws/funds";
import { GoalSelector, MAX_SIZE_IN_BYTES, VALID_MIME_TYPES } from "../common";
import { FeatureBanner } from "./FeatureBanner";
import type { FV } from "./schema";
import { useRhf } from "./useRhf";

export function Form({
  classes = "",
  ...props
}: SingleFund & { classes?: string }) {
  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();
  const rhf = useRhf(props);

  const [editFund, { isLoading: isEditingFund }] = useEditFundMutation();
  const [closeFund, { isLoading: isClosingFund }] = useCloseFundMutation();

  const onSubmit: SubmitHandler<FV> = async ({
    target,
    logo,
    banner,
    ...fv
  }) => {
    try {
      /// BUILD UPDATE ///
      const update: FundUpdate = {};

      if (rhf.dirtyFields.banner && banner.file) {
        const uploaded = await uploadFile(banner.file, "bg-funds");
        if (uploaded) update.banner = uploaded.publicUrl;
      }
      if (rhf.dirtyFields.logo && logo.file) {
        const uploaded = await uploadFile(logo.file, "bg-funds");
        if (uploaded) update.logo = uploaded.publicUrl;
      }

      if (rhf.dirtyFields.target) {
        update.target =
          target.type === "none"
            ? "0"
            : target.type === "smart"
              ? "smart"
              : target.value;
      }

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
            try {
              const fundNameConfirmation = window.prompt(
                "Type the name of this fund to confirm"
              );
              if (!fundNameConfirmation) return;
              if (fundNameConfirmation !== props.name) {
                return window.alert("Fund not closed: name is not confirmed");
              }

              await closeFund(props.id).unwrap();
            } catch (err) {
              handleError(err, { context: "closing fund" });
            }
          }}
          type="button"
          className="btn-red text-sm font-medium px-4 py-2 justify-self-end"
        >
          {isClosingFund ? "Closing.." : "Close fund"}
        </button>
        <button
          disabled={!rhf.isDirty}
          type="submit"
          className="btn-blue text-sm font-medium px-4 py-2 justify-self-end"
        >
          Update fund
        </button>
      </div>
    </Frm>
  );
}
