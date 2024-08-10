import { yupResolver } from "@hookform/resolvers/yup";
import {
  type Classes,
  ControlledImgEditor as ImgEditor,
  type ImgLink,
} from "components/ImgEditor";
import { useRef } from "react";
import { useController, useForm } from "react-hook-form";
import { genFileSchema } from "schemas/file";
import { schema } from "schemas/shape";
import { MAX_SIZE_IN_BYTES, VALID_MIME_TYPES } from "../common";

interface FV {
  img: ImgLink;
}

interface Props {
  init?: string;
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
  init,
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
    formState: { errors, isSubmitting },
  } = useForm<FV>({
    resolver: yupResolver(schema<FV>({ img: fileObj })),
    values: {
      img: {
        preview: init ?? "",
        publicUrl: init ?? "",
        name: "",
      },
    },
  });
  const { field: img } = useController({ control, name: "img" });

  const submitRef = useRef<HTMLButtonElement>(null);

  return (
    <form
      className={`${classes} grid`}
      onSubmit={handleSubmit(async (fv) => {
        if (!fv.img.file) throw `dev: must have file`;
        await onSubmit(fv.img.file);
      })}
    >
      <label className="text-lg font-medium block mb-1">{label}</label>
      {isSubmitting && <p>uploading...</p>}
      <ImgEditor
        disabled={isSubmitting}
        value={img.value}
        onSet={(v) => {
          img.onChange(v);
          trigger("img.file");
        }}
        onSave={(v) => {
          img.onChange(v);
          submitRef.current?.click();
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
      <button ref={submitRef} type="submit" className="invisible" />
    </form>
  );
}
