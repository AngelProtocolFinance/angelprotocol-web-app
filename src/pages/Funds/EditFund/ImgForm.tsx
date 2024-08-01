import { yupResolver } from "@hookform/resolvers/yup";
import {
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
}

const fileObj = schema<ImgLink>({
  file: genFileSchema(MAX_SIZE_IN_BYTES, VALID_MIME_TYPES),
});

export default function ImgForm({ bannerUrl, onSubmit }: Props) {
  const {
    control,
    trigger,
    resetField,
    handleSubmit,
    formState: { errors },
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
      onSubmit={handleSubmit(async (fv) => {
        if (!fv.img.file) throw `dev: must have file`;
        await onSubmit(fv.img.file);
      })}
    >
      <ImgEditor
        value={img.value}
        onChange={(v) => {
          img.onChange(v);
          trigger("img.file");
        }}
        onUndo={(e) => {
          e.stopPropagation();
          resetField("img");
        }}
        accept={VALID_MIME_TYPES}
        aspect={[4, 1]}
        classes={{
          container: "mb-4",
          dropzone: "aspect-[4/1]",
        }}
        maxSize={MAX_SIZE_IN_BYTES}
        error={errors.img?.file?.message}
      />

      <button>save</button>
    </form>
  );
}
