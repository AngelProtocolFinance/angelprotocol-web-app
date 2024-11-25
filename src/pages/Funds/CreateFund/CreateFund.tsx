import type { NewFund } from "@better-giving/fundraiser/schema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { ControlledImgEditor as ImgEditor } from "components/ImgEditor";
import Prompt from "components/Prompt";
import { RichText } from "components/RichText";
import {
  NativeCheckField as CheckField,
  NativeField as Field,
  Form,
  Label,
} from "components/form";
import { appRoutes } from "constants/routes";
import withAuth from "contexts/Auth";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { uploadFile } from "helpers/uploadFile";
import {
  type SubmitHandler,
  useController,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Link } from "react-router-dom";
import { useCreateFundMutation } from "services/aws/funds";
import { GoalSelector, MAX_SIZE_IN_BYTES, VALID_MIME_TYPES } from "../common";
import { Videos } from "../common/videos";
import { EndowmentSelector } from "./EndowmentSelector";
import { type FV, MAX_DESCRIPTION_CHAR, schema } from "./schema";

export default withAuth(function CreateFund() {
  const {
    register,
    control,
    trigger,
    resetField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      logo: { preview: "", publicUrl: "" },
      banner: { preview: "", publicUrl: "" },
      featured: true,
      members: [],
      target: {
        type: "smart",
      },
      videos: [],
    },
  });
  const { field: banner } = useController({ control, name: "banner" });
  const { field: logo } = useController({ control, name: "logo" });
  const { field: members } = useController({
    control,
    name: "members",
  });
  const { field: targetType } = useController({
    control,
    name: "target.type",
  });
  const { field: desc } = useController({
    control,
    name: "description",
  });

  const videos = useFieldArray<Pick<FV, "videos">, "videos">({
    control: control as any,
    name: "videos",
  });

  const [createFund] = useCreateFundMutation();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();

  const onSubmit: SubmitHandler<FV> = async ({ banner, logo, ...fv }) => {
    try {
      if (!banner.file || !logo.file) {
        throw `dev: banner must be required`;
      }

      showModal(Prompt, { type: "loading", children: "Creating fund..." });

      const _banner = await uploadFile(banner.file, "bg-funds");
      if (!_banner) return handleError("Failed to upload banner");
      const _logo = await uploadFile(logo.file, "bg-funds");
      if (!_logo) return handleError("Failed to upload logo");

      const fund: NewFund = {
        name: fv.name,
        description: fv.description.value,
        banner: _banner.publicUrl,
        logo: _logo.publicUrl,
        members: fv.members.map((m) => m.id),
        featured: fv.featured,
        target:
          fv.target.type === "none"
            ? `${0}`
            : fv.target.type === "smart"
              ? "smart"
              : `${+fv.target.value}`, //fixedTarget is required when targetType is fixed
        videos: fv.videos.map((v) => v.url),
      };

      if (fv.expiration) fund.expiration = fv.expiration;

      const res = await createFund(fund).unwrap();

      showModal(Prompt, {
        type: "success",
        children: (
          <p>
            Your{" "}
            <Link to={appRoutes.funds + `/${res.id}`} className="text-blue-d1">
              fund
            </Link>{" "}
            is created
            {fv.featured ? (
              <>
                {" "}
                and is now listed in{" "}
                <Link to={appRoutes.funds}>funds page</Link>
              </>
            ) : (
              ""
            )}
            !. To get access to this fund, kindly login again.
          </p>
        ),
      });
    } catch (err) {
      handleError(err, { context: "creating fund" });
    }
  };

  return (
    <div className="w-full padded-container">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="grid border border-gray-l4 rounded-lg p-6 my-4 w-full max-w-4xl"
      >
        <h4 className="font-bold text-xl mb-4">Fund information</h4>

        <Field
          {...register("name")}
          label="Name"
          required
          error={errors.name?.message}
          classes={{ label: "font-medium" }}
        />
        <label className="label font-medium mt-4 mb-1" data-required>
          Description
        </label>
        <RichText
          ref={desc.ref}
          content={desc.value}
          onChange={desc.onChange}
          placeHolder="A short overview of your organization"
          charLimit={MAX_DESCRIPTION_CHAR}
          classes={{
            field:
              "rich-text-toolbar border border-gray-l4 text-sm grid grid-rows-[auto_1fr] rounded bg-gray-l6 dark:bg-blue-d5 p-3 min-h-[15rem]",
            counter: "text-navy-l1 dark:text-navy-l2",
            error: "text-right",
          }}
          error={
            errors.description?.value?.message ||
            errors.description?.length?.message
          }
        />

        <Videos {...videos} classes="mt-4 mb-8" />

        <EndowmentSelector
          classes="mt-4"
          ref={members.ref}
          values={members.value}
          onChange={members.onChange}
          error={errors.members?.message}
        />

        <label className="block mt-6 text-sm font-medium">
          Fundraiser goal
        </label>
        <GoalSelector
          classes="mt-2 mb-2"
          value={targetType.value}
          onChange={targetType.onChange}
        />
        {targetType.value === "fixed" && (
          <Field
            {...register("target.value", { shouldUnregister: true })}
            label="How much money do you want to raise?"
            classes="mt-2"
            placeholder="$"
            error={errors.target?.value?.message}
          />
        )}

        <Label className="mt-6 mb-2" required>
          Banner
        </Label>
        <ImgEditor
          value={banner.value}
          onChange={(v) => {
            banner.onChange(v);
            trigger("banner.file");
          }}
          onUndo={(e) => {
            e.stopPropagation();
            resetField("banner");
          }}
          accept={VALID_MIME_TYPES}
          aspect={[4, 1]}
          classes={{
            container: "mb-4",
            dropzone: "aspect-[4/1]",
          }}
          maxSize={MAX_SIZE_IN_BYTES}
          error={errors.banner?.file?.message}
        />

        <Label className="mt-6 mb-2" required>
          Logo
        </Label>
        <ImgEditor
          value={logo.value}
          onChange={(v) => {
            logo.onChange(v);
            trigger("logo.file");
          }}
          onUndo={(e) => {
            e.stopPropagation();
            resetField("logo");
          }}
          accept={VALID_MIME_TYPES}
          aspect={[1, 1]}
          classes={{
            container: "mb-4",
            dropzone: "aspect-[1/1] w-60",
          }}
          maxSize={MAX_SIZE_IN_BYTES}
          error={errors.logo?.file?.message}
        />

        <Field
          {...register("expiration")}
          label="Expiration"
          type="date"
          classes={{ input: "uppercase" }}
          error={errors.expiration?.message}
        />

        <CheckField {...register("featured")} classes="col-span-full my-6">
          Featured in funds page
        </CheckField>

        <button
          type="submit"
          className="mt-8 btn-blue text-sm font-medium px-4 py-2 justify-self-end"
        >
          Create Fund
        </button>
      </Form>
    </div>
  );
});
