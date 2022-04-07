import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { FieldValues } from "react-hook-form";
import { MdOutlineFileUpload } from "react-icons/md";
import { BaseProps, FileWrapper } from "./types";

type Props<T extends FieldValues> = BaseProps<T> & {
  onDrop: <K extends File>(
    acceptedFiles: K[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  value: FileWrapper | FileWrapper[];
};

export default function Dropzone<T extends FieldValues>(props: Props<T>) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: props.onDrop,
    multiple: props.multiple,
    disabled: props.disabled,
  });

  const className = `flex items-center rounded-md border-none w-full px-2 py-1 text-black ${
    isDragActive
      ? "bg-angel-blue/50 ring ring-angel-blue"
      : "bg-white outline-none"
  } ${props.className} ${
    props.disabled ? "cursor-default bg-grey-accent/40" : ""
  }`;

  return (
    <div {...getRootProps({ className })}>
      <input id={props.name} {...getInputProps()} />
      <DropzoneText files={props.value} />
    </div>
  );
}

type DropzoneTextProps = { files: FileWrapper | FileWrapper[] };

function DropzoneText({ files }: DropzoneTextProps) {
  const fileNames = getFileNames(files);

  return !fileNames.length ? (
    <span className="flex items-center gap-1 text-dark-grey text-sm">
      <MdOutlineFileUpload className="text-lg" />
      Select file or Drag &amp; Drop
    </span>
  ) : (
    <label className="flex text-black text-sm truncate" title={fileNames}>
      {fileNames}
    </label>
  );
}

function getFileNames(files: FileWrapper | FileWrapper[]) {
  let fileWrappers: FileWrapper[] = [];
  if (!!files) {
    fileWrappers = fileWrappers.concat(files);
  }
  const fileNames = fileWrappers
    .map((fileWrapper) => fileWrapper.name)
    .join(", ");
  return fileNames;
}
