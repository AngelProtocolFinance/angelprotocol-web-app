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

export default function Dropzone(props: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: props.onDrop,
    multiple: props.multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex items-center rounded-md border-none w-full px-2 py-1 text-black ${
        isDragActive
          ? "bg-angel-blue bg-opacity-50 ring ring-angel-blue"
          : "bg-white outline-none"
      } ${props.className}`}
    >
      <input id={props.name} {...getInputProps()} />
      <DropzoneText files={props.value} />
    </div>
  );
}

function DropzoneText({ files }: { files: File | File[] }) {
  const fileNames = getFileNames(files);

  return !fileNames.length ? (
    <span className="flex items-center gap-1 text-dark-grey text-sm">
      <MdOutlineFileUpload className="text-lg" />
      Select file or Drag &amp; Drop
    </span>
  ) : (
    <label
      className="flex text-black text-sm truncate cursor-pointer"
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
