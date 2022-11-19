import { ErrorMessage } from "@hookform/error-message";
import { useDropzone } from "react-dropzone";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { FileObject } from "types/aws";
import Icon from "components/Icon";

export type Asset = {
  previews: FileObject[]; //from previous submission
  files: File[]; //new files
};

type Key = keyof Asset;
const filesKey: Key = "files";
const previewsKey: Key = "previews";

export default function FileDropzone<
  T extends FieldValues,
  K extends Path<T>
>(props: {
  name: T[K] extends Asset ? K : never;
  multiple?: true;
  disabled?: boolean;
  className?: string;
  tooltip: string;
}) {
  const filesId = `${props.name}.${filesKey}` as Path<T>;
  const previewsId = `${props.name}.${previewsKey}` as Path<T>;

  const {
    getValues,
    formState: { errors, isSubmitting },
  } = useFormContext<T>();

  const {
    field: { value: files, onChange: onFilesChange },
  } = useController<T>({ name: filesId });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files: File[]) => {
      onFilesChange(files);
    },
    multiple: props.multiple,
    disabled: props.disabled,
  });

  return (
    <div>
      <div
        {...getRootProps({
          className: `relative grid place-items-center rounded border border-dashed w-full h-[11.375rem] focus:outline-none ${
            isDragActive
              ? "border-gray-d1 dark:border-gray"
              : "border-gray-l2 dark:border-bluegray focus:border-orange-l2 focus:dark:border-blue-d1"
          } ${
            isSubmitting || props.disabled
              ? "cursor-default bg-gray-l4 dark:bg-bluegray-d1"
              : "bg-gray-l5 dark:bg-blue-d4 cursor-pointer"
          } ${props.className ?? ""}`,
        })}
      >
        <input {...getInputProps({ id: filesId })} />
        <DropzoneText
          files={files}
          previews={getValues(previewsId)}
          filesId={filesId}
          formErrors={errors}
        />
      </div>
      <p className="text-xs text-gray-d1 dark:text-gray mt-2">
        {props.tooltip}{" "}
        <ErrorMessage
          name={filesId as any}
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
  filesId,
  files,
  previews,
}: Asset & { filesId: string; formErrors: any }) {
  const isFilesEmpty = files.length <= 0;
  const isPreviewsEmpty = previews.length <= 0;

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
          <a
            onClickCapture={(ev) => ev.stopPropagation()}
            key={name}
            href={publicUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm block text-blue hover:text-blue-l1"
          >
            {name}
          </a>
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
            name={`${filesId}.${i}`}
            as="span"
            className="text-red dark:text-red-l2 text-xs before:content-['-'] before:mx-1"
          />
        </p>
      ))}
    </div>
  );
}
