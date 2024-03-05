import { ErrorMessage } from "@hookform/error-message";
import { useDropzone } from "react-dropzone";
import { FieldValues, Path, get, useController } from "react-hook-form";
import { FileDropzoneAsset } from "types/components";
import { MIMEType } from "types/lists";
import DropzoneText from "./DropzoneText";

const filesKey: keyof FileDropzoneAsset = "files";

export default function FileDropzone<
  T extends FieldValues,
  K extends Path<T>,
>(props: {
  name: T[K] extends FileDropzoneAsset ? K : never;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  specs: { mbLimit: number; mimeTypes: MIMEType[] };
}) {
  const {
    field: { value, onChange: onFilesChange, ref },
    formState: { errors, isSubmitting },
  } = useController<Record<string, FileDropzoneAsset>, K>({
    name: props.name,
  });

  const filesId = `${props.name}.${filesKey}`;
  const disabled = props.disabled || isSubmitting;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files: File[]) => {
      onFilesChange({ ...value, files });
    },
    multiple: props.multiple,
    disabled: disabled,
  });

  const invalid = !!get(errors, filesId);

  return (
    <div>
      <div
        aria-invalid={invalid}
        {...getRootProps({
          className: `relative grid place-items-center rounded border border-dashed w-full h-[11.375rem] focus:outline-none ${
            isDragActive
              ? "border-gray-d1 dark:border-gray"
              : invalid
                ? "border-red focus:shadow-focus"
                : "border-gray-l4 focus:border-orange-l2 focus:dark:border-blue-d1"
          } ${
            disabled
              ? "cursor-default bg-gray-l5 dark:bg-navy-d3"
              : "bg-gray-l6 dark:bg-blue-d5 cursor-pointer"
          } ${props.className ?? ""}`,
          ref,
        })}
      >
        <input {...getInputProps({ id: props.name })} />
        <DropzoneText {...value} fieldName={props.name} formErrors={errors} />
      </div>
      <p className="text-xs text-navy-l1 dark:text-gray mt-2">
        Valid types are:
        {props.specs.mimeTypes
          .map((m) => m.split("/")[1].toUpperCase())
          .join(", ")}
        . File should be less than {props.specs.mbLimit} MB{" "}
        <ErrorMessage
          name={filesId}
          errors={errors}
          as="span"
          className="text-red dark:text-red-l2 text-xs before:content-['('] before:mr-0.5 after:content-[')'] after:ml-0.5 empty:before:hidden empty:after:hidden"
        />
      </p>
    </div>
  );
}
