import { yupResolver } from "@hookform/resolvers/yup";
import {
  type Classes,
  ControlledImgEditor as ImgEditor,
  type ImgLink,
} from "components/ImgEditor";
import { useController, useForm } from "react-hook-form";
import { genFileSchema } from "schemas/file";
import { schema } from "schemas/shape";
import { MAX_SIZE_IN_BYTES, VALID_MIME_TYPES } from "../common";

interface FV {
  img: ImgLink;
}

interface Props {
  bannerUrl?: string;
  onSubmit: (img: File) => Promise<void>;
  classes?: string;
  imgClasses: Classes;
  aspect: [number, number];
  label: string;
}

const fileObj = schema<ImgLink>({
  file: genFileSchema(MAX_SIZE_IN_BYTES, VALID_MIME_TYPES),
});

export default function ImgForm({
  bannerUrl,
  onSubmit,
  imgClasses,
  classes,
  aspect,
  label,
}: Props) {
  const {
    control,
    trigger,
    resetField,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FV>({
    resolver: yupResolver(schema<FV>({ img: fileObj })),
    values: {
      img: {
        preview: bannerUrl ?? "",
        publicUrl: bannerUrl ?? "",
        name: "",
      },
    },
  });
  const { field: img } = useController({ control, name: "img" });

  return (
    <form
      className={`${classes} border border-gray-l4 p-4 rounded-lg grid`}
      onSubmit={handleSubmit(async (fv) => {
        if (!fv.img.file) throw `dev: must have file`;
        await onSubmit(fv.img.file);
      })}
    >
      <label className="text-lg font-medium block mb-1">{label}</label>

      <ImgEditor
        value={img.value}
        onChange={async (v) => {
          img.onChange(v);
          const valid = await trigger("img.file");
          if (!valid) return;
        }}
        onUndo={(e) => {
          e.stopPropagation();
          resetField("img");
        }}
        accept={VALID_MIME_TYPES}
        aspect={aspect}
        classes={imgClasses}
        maxSize={MAX_SIZE_IN_BYTES}
        error={errors.img?.file?.message}
      />
      <button
        disabled={isSubmitting || !isDirty}
        className="btn-blue py-2 px-4 text-sm uppercase justify-self-end"
        type="submit"
      >
        {isSubmitting ? "Updating..." : "Save"}
      </button>
    </form>
  );
}
