import type { NewFund } from "@better-giving/fundraiser";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { ControlledImgEditor as ImgEditor } from "components/ImgEditor";
import Prompt from "components/Prompt";
import { RichText } from "components/RichText";
import { NativeField as Field, Form, Label } from "components/form";
import { GoalSelector } from "components/goal-selector";
import { appRoutes } from "constants/routes";
import withAuth from "contexts/Auth";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { useEffect } from "react";
import {
  type SubmitHandler,
  useController,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { useCreateFundMutation } from "services/aws/funds";
import { useEndowment } from "services/aws/useEndowment";
import { imgSpec } from "../common";
import { Videos } from "../common/videos";
import { EndowmentSelector } from "./EndowmentSelector";
import { type FV, MAX_DESCRIPTION_CHAR, schema } from "./schema";

export default withAuth(function CreateFund() {
  const [params] = useSearchParams();
  const npoParam = params.get("npo");
  const npoId = npoParam ? +npoParam : 0;
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
      banner: "",
      logo: "",
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

  const { data: initNpoMember } = useEndowment(npoId, ["name", "id", "logo"]);

  useEffect(() => {
    initNpoMember && members.onChange([initNpoMember]);
  }, [initNpoMember, members.onChange]);

  const onSubmit: SubmitHandler<FV> = async (fv) => {
    try {
      const fund: NewFund = {
        name: fv.name,
        description: fv.description.value,
        banner: fv.banner,
        logo: fv.logo,
        members: fv.members.map((m) => m.id),
        featured: true, // internal ( req update: all fundraisers are public )
        target:
          fv.target.type === "none"
            ? `${0}`
            : fv.target.type === "smart"
              ? "smart"
              : `${+fv.target.value}`, //fixedTarget is required when targetType is fixed
        videos: fv.videos.map((v) => v.url),
        npo_owner: npoId,
      };

      if (fv.expiration) fund.expiration = fv.expiration;

      const res = await createFund(fund).unwrap();

      showModal(Prompt, {
        type: "success",
        children: (
          <p>
            Congratulations, your{" "}
            <Link to={appRoutes.funds + `/${res.id}`} className="text-blue-d1">
              fund
            </Link>{" "}
            was successfully created!
          </p>
        ),
      });
    } catch (err) {
      handleError(err, { context: "creating fund" });
    }
  };

  const isUploading = banner.value === "loading" || logo.value === "loading";

  return (
    <div className="w-full padded-container">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="grid border border-gray-l4 rounded-lg p-6 my-4 w-full max-w-4xl"
      >
        <h4 className="font-bold text-xl mb-4">Fund Information</h4>

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
          placeHolder="A short overview of your fundraiser"
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
          Fundraiser Goal
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
          bucket="bg-funds"
          value={banner.value}
          spec={imgSpec([4, 1])}
          onChange={(v) => {
            banner.onChange(v);
            trigger("banner");
          }}
          onUndo={(e) => {
            e.stopPropagation();
            resetField("banner");
          }}
          classes={{
            container: "mb-4",
            dropzone: "aspect-[4/1]",
          }}
          error={errors.banner?.message}
        />

        <Label className="mt-6 mb-2" required>
          Logo
        </Label>
        <ImgEditor
          bucket="bg-funds"
          value={logo.value}
          onChange={(v) => {
            logo.onChange(v);
            trigger("logo");
          }}
          onUndo={(e) => {
            e.stopPropagation();
            resetField("logo");
          }}
          spec={imgSpec([1, 1])}
          classes={{
            container: "mb-4",
            dropzone: "aspect-[1/1] w-60",
          }}
          error={errors.logo?.message}
        />

        <Field
          {...register("expiration")}
          label="Expiration"
          type="date"
          classes={{ input: "uppercase" }}
          error={errors.expiration?.message}
          required={false}
        />

        <button
          disabled={isUploading}
          type="submit"
          className="mt-8 btn-blue text-sm font-medium px-4 py-2 justify-self-end"
        >
          Create Fund
        </button>
      </Form>
    </div>
  );
});
