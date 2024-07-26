import { ControlledImgEditor as ImgEditor } from "components/ImgEditor";
import { NativeField as Field, Form, Label } from "components/form";
import {
  AVATAR_MAX_SIZE_BYTES,
  AVATAR_MIME_TYPE,
} from "pages/UserDashboard/EditProfile/useRhf";
import { useController, useForm } from "react-hook-form";
import type { FormValues as FV } from "./types";
export default function CreateFund() {
  const {
    register,
    control,
    trigger,
    resetField,
    formState: { errors },
  } = useForm<FV>({
    defaultValues: {
      banner: { preview: "", publicUrl: "" },
    },
  });
  const { field: banner } = useController({ control, name: "banner" });
  return (
    <div className="w-full padded-container">
      <Form className="border border-gray-l4 rounded-lg p-4 mt-4">
        <Field {...register("name")} label="Name" required />
        <Field
          type="textarea"
          {...register("description")}
          label="Description"
          required
          classes="mt-4"
        />

        <Label className="mt-4 mb-2" required>
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
      </Form>
    </div>
  );
}
