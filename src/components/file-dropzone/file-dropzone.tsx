import { logger } from "helpers/logger";
import { uploadFile } from "helpers/upload-file";
import { type ReactNode, forwardRef, useState } from "react";
import { useDropzone } from "react-dropzone-esm";
import DropzoneText from "./dropzone-text";
import type { FileOutput, FileSpec } from "./types";

interface Props {
  label?: ReactNode;
  value: FileOutput;
  onChange: (val: FileOutput) => void;
  disabled?: boolean;
  className?: string;
  specs: FileSpec;
  error?: string;
}
type El = HTMLDivElement;

export const FileDropzone = forwardRef<El, Props>((props, ref) => {
  const [file, setFile] = useState<File>();

  const onDrop = async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);

    if (!props.specs.mimeTypes.includes(f.type as any)) {
      return props.onChange("invalid-type");
    }
    if (f.size > props.specs.mbLimit * 1e6) {
      return props.onChange("exceeds-size");
    }

    try {
      props.onChange("loading");
      const url = await uploadFile(f);
      return props.onChange(url);
    } catch (err) {
      logger.error(err);
      return props.onChange("failure");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: props.disabled,
  });

  return (
    <div className={props.className}>
      {props.label}
      <p className="text-xs text-gray dark:text-gray mb-2">
        Valid types are:{" "}
        {props.specs.mimeTypes
          .map((m) => m.split("/")[1].toUpperCase())
          .join(", ")}
        . File should be less than {props.specs.mbLimit} MB{" "}
      </p>
      <div
        data-invalid={!!props.error}
        data-drag={isDragActive}
        data-disabled={props.disabled || props.value === "loading"}
        {...getRootProps({
          className: `relative grid place-items-center rounded border border-gray-l2 border-dashed w-full h-[11.375rem]
          focus:outline-hidden focus:ring-2 data-[drag="true"]:ring-2 has-active:ring-2 ring-blue-d1 ring-offset-2 
          hover:bg-blue-l5
          data-[disabled="true"]:bg-gray-l5 data-[disabled="true"]:pointer-events-none data-[disabled="true"]:ring-0
          data-[invalid="true"]:border-red
          `,
          ref,
        })}
      >
        <input {...getInputProps()} />
        <DropzoneText value={props.value || file} />
      </div>

      {props.error && (
        <span className="text-red dark:text-red-l2 text-xs">{props.error}</span>
      )}
    </div>
  );
});
