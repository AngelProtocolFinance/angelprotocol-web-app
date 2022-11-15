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
}) {
  const filesId = `${props.name}.${filesKey}` as Path<T>;
  const previewsId = `${props.name}.${previewsKey}` as Path<T>;

  const {
    getValues,
    formState: { errors },
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
    <div
      {...getRootProps({
        className: `relative grid place-items-center rounded border border-dashed w-full h-[11.375rem] focus:outline-none  ${
          isDragActive
            ? "border-gray-d1"
            : "border-gray-l2 focus:border-blue-l1"
        } ${
          props.disabled
            ? "cursor-default bg-gray-l4"
            : "bg-orange-l6 cursor-pointer"
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

      {(files as File[])
        //show 1 error for now
        .map((_, i) => (
          <ErrorMessage
            key={i}
            name={`${filesId}.${i}`}
            as="p"
            className="absolute left-1/2 transform w-full -translate-x-1/2 text-red dark:text-red-l2 text-xs -bottom-4"
          />
        ))
        .find((err) => err) || <></>}
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
      <span className="grid justify-items-center text-sm text-gray-d1">
        <Icon type="FileUpload" size={24} className="mb-[1.125rem]" />
        <p className="font-semibold mb-1">Upload file</p>
        <span>Click to Browse or Drag &amp; Drop</span>
      </span>
    );
  }

  if (isFilesEmpty) {
    //TODO: convert this to links
    const names = previews.map(({ name }) => name).join(" ,");
    return (
      <label className="flex text-black text-sm truncate" title={names}>
        {names}
      </label>
    );
  } else {
    return (
      <div className="grid">
        {files.map(({ name }, i) => (
          <p>
            <label className="text-sm">{name}</label>
            <ErrorMessage
              errors={formErrors}
              name={`${filesId}.${i}`}
              as="span"
              className="text-red text-xs before:content-['-'] before:mx-1"
            />
          </p>
        ))}
      </div>
    );
  }
}
