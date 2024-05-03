import { ErrorMessage } from "@hookform/error-message";
import { useDropzone } from "react-dropzone";
import {
  type FieldValues,
  type Path,
  get,
  useController,
} from "react-hook-form";
import type { FileDropzoneAsset } from "types/components";
import type { MIMEType } from "types/lists";
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
        data-invalid={invalid}
        data-drag={isDragActive}
        data-disabled={isSubmitting}
        {...getRootProps({
          className: `relative ${props.className ?? ""} grid place-items-center rounded border border-gray-l2 border-dashed w-full h-[11.375rem]
          focus:outline-none focus:ring-2 data-[drag="true"]:ring-2 has-[:active]:ring-2 ring-blue-d1 ring-offset-2 
          hover:bg-blue-l5
          data-[disabled="true"]:bg-gray-l5 data-[disabled="true"]:pointer-events-none
          data-[invalid="true"]:border-red
          `,
          ref,
        })}
      >
        <input {...getInputProps({ id: props.name })} />
        <DropzoneText {...value} fieldName={props.name} formErrors={errors} />
      </div>
      <p className="text-xs text-navy-l1 dark:text-navy-l2 mt-2">
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
