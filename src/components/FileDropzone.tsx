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

  const { getValues } = useFormContext<T>();

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

  const className = `relative flex items-center rounded-md border-none w-full px-2 py-1 text-black ${
    isDragActive ? "bg-blue/50 ring ring-blue" : "bg-white outline-none"
  } ${props.className} ${
    props.disabled ? "cursor-default bg-gray/40" : "cursor-pointer"
  }`;

  return (
    <div {...getRootProps({ className })}>
      <input {...getInputProps({ id: filesId })} />
      <DropzoneText files={files} previews={getValues(previewsId)} />

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

function DropzoneText({ files, previews }: Asset) {
  const isFilesEmpty = files.length <= 0;
  const isPreviewsEmpty = previews.length <= 0;

  if (isFilesEmpty && isPreviewsEmpty) {
    return (
      <span className="flex items-center gap-1 text-dark-grey text-sm">
        <Icon type="Upload" className="text-lg" />
        Select file or Drag &amp; Drop
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
    //TODO: once UI is rectangular, add error messages below each name
    const names = files.map(({ name }) => name).join(" ,");
    return (
      <label className="flex text-black text-sm truncate" title={names}>
        {names}
      </label>
    );
  }
}
