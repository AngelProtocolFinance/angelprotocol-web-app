import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import { BaseProps } from "./types";

type Props = BaseProps & {
  onDrop: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  value: File | File[];
};

const DISABLED_CLASSES = "cursor-default bg-light-grey opacity-30";

export default function Dropzone(props: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: props.onDrop,
    multiple: props.multiple,
    disabled: props.disabled,
  });

  const className = `flex items-center rounded-md border-none w-full px-2 py-1 text-black ${
    isDragActive
      ? "bg-angel-blue bg-opacity-50 ring ring-angel-blue"
      : "bg-white outline-none"
  } ${props.className} ${props.disabled ? DISABLED_CLASSES : ""}`;

  return (
    <div {...getRootProps({ className })}>
      <input id={props.name} {...getInputProps()} />
      <DropzoneText files={props.value} disabled={props.disabled} />
    </div>
  );
}

type DropzoneTextProps = { files: File | File[]; disabled?: boolean };

function DropzoneText({ files, disabled }: DropzoneTextProps) {
  const fileNames = getFileNames(files);
  const disabledClass = disabled ? DISABLED_CLASSES : "";

  return !fileNames.length ? (
    <span
      className={`flex items-center gap-1 text-dark-grey text-sm ${disabledClass}`}
    >
      <MdOutlineFileUpload className="text-lg" />
      Select file or Drag &amp; Drop
    </span>
  ) : (
    <label
      className={`flex text-black text-sm truncate ${disabledClass}`}
      title={fileNames}
    >
      {fileNames}
    </label>
  );
}

function getFileNames(files: File | File[]) {
  let fileArray: File[] = [];
  if (!!files) {
    fileArray = fileArray.concat(files);
  }
  const fileNames = fileArray.map((file) => file.name).join(", ");
  return fileNames;
}
