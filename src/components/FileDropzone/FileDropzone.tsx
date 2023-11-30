import { ErrorMessage } from "@hookform/error-message";
import { useDropzone } from "react-dropzone";
import { FieldValues, Path, get, useController } from "react-hook-form";
import { FileDropzoneAsset } from "types/components";
import { MIMEType } from "types/lists";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { isEmpty } from "helpers";

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
    formState: { errors, isSubmitting, isValid },
  } = useController<Record<string, FileDropzoneAsset>, K>({
    name: props.name,
  });

  const disabled = props.disabled || isSubmitting;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files: File[]) => {
      onFilesChange({ ...value, files });
    },
    multiple: props.multiple,
    disabled: disabled,
  });

  return (
    <div>
      <div
        aria-invalid={!!get(errors, props.name)?.message}
        {...getRootProps({
          className: `relative grid place-items-center rounded border border-dashed w-full h-[11.375rem] focus:outline-none ${
            isDragActive
              ? "border-gray-d1 dark:border-gray"
              : `${
                  isValid ? "border-prim" : "border-red"
                } focus:border-orange-l2 focus:dark:border-blue-d1`
          } ${
            disabled
              ? "cursor-default bg-gray-l5 dark:bg-bluegray-d1"
              : "bg-gray-l6 dark:bg-blue-d5 cursor-pointer"
          } ${props.className ?? ""} dropzone`,
          ref,
        })}
      >
        <input {...getInputProps({ id: props.name })} />
        <DropzoneText {...value} fieldName={props.name} formErrors={errors} />
      </div>
      <p className="text-xs text-gray-d1 dark:text-gray mt-2">
        Valid types are:
        {props.specs.mimeTypes
          .map((m) => m.split("/")[1].toUpperCase())
          .join(", ")}
        . File should be less than {props.specs.mbLimit} MB{" "}
        <ErrorMessage
          name={props.name}
          errors={errors}
          as="span"
          className="text-red dark:text-red-l2 text-xs before:content-['('] before:mr-0.5 after:content-[')'] after:ml-0.5 empty:before:hidden empty:after:hidden"
        />
      </p>
    </div>
  );
}

function DropzoneText({
  formErrors,
  fieldName,
  files,
  previews,
}: FileDropzoneAsset & { fieldName: string; formErrors: any }) {
  const isFilesEmpty = isEmpty(files);
  const isPreviewsEmpty = isEmpty(previews);

  if (isFilesEmpty && isPreviewsEmpty) {
    return (
      <span className="grid justify-items-center text-sm text-gray-d1 dark:text-gray">
        <Icon type="FileUpload" size={24} className="mb-[1.125rem]" />
        <p className="font-semibold mb-1">Upload file</p>
        <span>Click to Browse or Drag &amp; Drop</span>
      </span>
    );
  }

  if (isFilesEmpty) {
    return (
      <div>
        {previews.map(({ name, publicUrl }) => (
          <ExtLink
            onClickCapture={(ev) => ev.stopPropagation()}
            key={name}
            href={publicUrl}
            className="text-sm block text-blue hover:text-blue-l1"
          >
            {name}
          </ExtLink>
        ))}
      </div>
    );
  }

  return (
    <div>
      {files.map(({ name }, i) => (
        <p key={name}>
          <label className="text-sm">{name}</label>
          <ErrorMessage
            errors={formErrors}
            name={`${fieldName}.files.${i}`}
            as="span"
            className="text-red dark:text-red-l2 text-xs before:content-['-'] before:mx-1"
          />
        </p>
      ))}
    </div>
  );
}
