import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledImgEditor as ImgEditor } from "components/ImgEditor";
import {
  NativeCheckField as CheckField,
  NativeField as Field,
  Form,
  Label,
} from "components/form";
import {
  AVATAR_MAX_SIZE_BYTES,
  AVATAR_MIME_TYPE,
} from "pages/UserDashboard/EditProfile/useRhf";
import { useController, useForm } from "react-hook-form";
import { schema } from "./schema";
import type { FormValues as FV } from "./types";
export default function CreateFund() {
  const {
    register,
    control,
    trigger,
    resetField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FV>({
    resolver: yupResolver(schema),
    defaultValues: {
      banner: { preview: "", publicUrl: "" },
      logo: { preview: "", publicUrl: "" },
      featured: true,
    },
  });
  const { field: banner } = useController({ control, name: "banner" });
  const { field: logo } = useController({ control, name: "logo" });
  return (
    <div className="w-full padded-container">
      <Form
        onSubmit={handleSubmit((fv) => {
          console.log(fv.expiration);
        })}
        disabled={isSubmitting}
        className="border border-gray-l4 rounded-lg p-4 my-4"
      >
        <h4 className="font-bold text-xl mb-4">Fund information</h4>
        <Field
          {...register("name")}
          label="Name"
          required
          error={errors.name?.message}
        />
        <Field
          type="textarea"
          {...register("description")}
          label="Description"
          required
          classes="mt-4"
          error={errors.description?.message}
        />

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

        <h4 className="font-bold text-xl mb-4 mt-12">Donate form settings</h4>

        <button type="submit">submit</button>
      </Form>
    </div>
  );
}
