import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledImgEditor as ImgEditor } from "components/ImgEditor";
import Prompt from "components/Prompt";
import { LockedSplitSlider } from "components/donation";
import {
  NativeCheckField as CheckField,
  NativeField as Field,
  Form,
  Label,
} from "components/form";
import { APP_NAME } from "constants/env";
import { appRoutes } from "constants/routes";
import withAuth from "contexts/Auth";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { logger } from "helpers";
import { getFullURL, uploadFiles } from "helpers/uploadFiles";
import {
  AVATAR_MAX_SIZE_BYTES,
  AVATAR_MIME_TYPE,
} from "pages/UserDashboard/EditProfile/useRhf";
import { useRef } from "react";
import { type SubmitHandler, useController, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLazyProfileQuery } from "services/aws/aws";
import { useCreateFundMutation } from "services/aws/funds";
import type { Fund } from "types/aws";
import { EndowmentSelector } from "./EndowmentSelector";
import GoalSelector from "./GoalSelector";
import { schema } from "./schema";
import type { FormValues as FV } from "./types";

export default withAuth(function CreateFund() {
  const {
    register,
    control,
    trigger,
    resetField,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    setFocus,
    watch,
  } = useForm<FV>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      logo: { preview: "", publicUrl: "" },
      banner: { preview: "", publicUrl: "" },
      expiration: "",
      featured: true,
      members: [],
      settings: {
        from: "fund",
        allowBgTip: true,
        liquidSplit: 50,
      },
      targetType: "smart",
    },
  });
  const { field: banner } = useController({ control, name: "banner" });
  const { field: logo } = useController({ control, name: "logo" });
  const { field: liquidSplitPct } = useController({
    control,
    name: "settings.liquidSplit",
  });
  const { field: members } = useController({
    control,
    name: "members",
  });
  const { field: targetType } = useController({
    control,
    name: "targetType",
  });

  //keep track of what user previously set
  //revert to it when endow is no longer 1
  const customSplitRef = useRef(50);
  const customAllowBgTipRef = useRef(true);
  const endowReqRef = useRef<string>();

  const [getEndow] = useLazyProfileQuery();
  const [createFund] = useCreateFundMutation();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();
  const settings = watch("settings");

  const onSubmit: SubmitHandler<FV> = async ({ banner, logo, ...fv }) => {
    try {
      if (!banner.file || !logo.file) {
        throw `dev: banner must be required`;
      }

      showModal(Prompt, { type: "loading", children: "Uploading..." });

      const uploadBaseUrl = await uploadFiles(
        [banner.file, logo.file],
        "bg-funds"
      );
      if (!uploadBaseUrl) throw `upload failed`;

      showModal(Prompt, { type: "loading", children: "Creating fund..." });

      const fund: Fund.New = {
        name: fv.name,
        description: fv.description,
        banner: getFullURL(uploadBaseUrl, banner.file.name),
        logo: getFullURL(uploadBaseUrl, logo.file.name),
        members: fv.members.map((m) => m.id),
        featured: fv.featured,
        settings: {
          liquidSplitPct: fv.settings.liquidSplit,
          allowBgTip: fv.settings.allowBgTip,
        },
        expiration: fv.expiration,
      };

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
        <Field
          type="textarea"
          {...register("description")}
          label="Description"
          required
          classes={{ container: "mt-4", label: "font-medium" }}
          error={errors.description?.message}
        />

        <EndowmentSelector
          classes="mt-4"
          ref={members.ref}
          values={members.value}
          onChange={async (curr) => {
            members.onChange(curr);
            if (curr.length === 0 || curr.length > 1) {
              //invalidate pending request
              endowReqRef.current = undefined;
              return setValue("settings", {
                from: "fund",
                liquidSplit: customSplitRef.current,
                allowBgTip: customAllowBgTipRef.current,
              });
            }

            //set settings if applicable
            try {
              const [opt] = curr;
              const endowReq = getEndow(
                {
                  id: opt.id,
                  fields: ["hide_bg_tip", "splitLiqPct", "name"],
                },
                true
              );

              endowReqRef.current = endowReq.requestId;

              const endow = await endowReq.unwrap();

              // more recent onChange invalidated this result
              if (!endowReqRef.current) return;

              setValue("settings", {
                from: endow.name,
                allowBgTip: !endow.hide_bg_tip,
                liquidSplit: endow.splitLiqPct ?? 50,
              });
            } catch (err) {
              logger.error(err);
            }
          }}
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
            {...register("fixedTarget")}
            label="How much money do you want to raise?"
            classes="mt-2"
            error={errors.fixedTarget?.message}
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
          accept={AVATAR_MIME_TYPE}
          aspect={[4, 1]}
          classes={{
            container: "mb-4",
            dropzone: "aspect-[4/1]",
          }}
          maxSize={AVATAR_MAX_SIZE_BYTES}
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
          accept={AVATAR_MIME_TYPE}
          aspect={[1, 1]}
          classes={{
            container: "mb-4",
            dropzone: "aspect-[1/1] w-60",
          }}
          maxSize={AVATAR_MAX_SIZE_BYTES}
          error={errors.banner?.file?.message}
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

        <h4 className="font-bold text-xl mb-2 mt-12">Donate form settings</h4>
        <p className="text-sm text-navy-l1">
          {settings.from !== "fund" &&
            `${withPossesive(settings.from)} config has been applied`}
        </p>

        <label className="block mb-4 mt-10 font-medium text-base">
          Define default split value:
        </label>
        <LockedSplitSlider
          disabled={settings.from !== "fund"}
          value={100 - liquidSplitPct.value}
          onChange={(lockedPct) => {
            const liq = 100 - lockedPct;
            liquidSplitPct.onChange(liq);
            customSplitRef.current = liq;
          }}
        />

        <CheckField
          {...register("settings.allowBgTip")}
          disabled={settings.from !== "fund"}
          classes="font-medium mt-8"
          onChange={(e) => {
            customAllowBgTipRef.current = e.target.checked;
          }}
        >
          Allow tips to {APP_NAME}
        </CheckField>
        <p className="text-xs sm:text-sm text-navy-l1 mt-2">
          During the donation flow, there is a step in which users can choose to
          tip {APP_NAME} any amount they desire alongside their donation to this
          fund. The amount they tip will not affect the donation amount this
          fund receives. You may choose to turn this step off in the donation
          flow and we will instead apply a fixed 2.9% fee to the amount donated
          to this fund.
        </p>

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

const withPossesive = (name: string) =>
  name.endsWith("s") ? `${name}'` : `${name}'s`;
