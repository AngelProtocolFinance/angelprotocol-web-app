import { MdOutlineFileUpload } from "react-icons/md";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  multiple?: true | boolean;
  className?: string;
};

export default function FileDropzone(props: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Dropzone {...props} onDrop={onChange} value={value} />
      )}
    />
  );
}

type DropzoneProps = Props & {
  onDrop: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  value: FileList;
};

function Dropzone(props: DropzoneProps) {
  const { name, multiple, onDrop, value, className } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex items-center rounded-md border-none w-full px-2 py-1 text-black ${
        isDragActive
          ? "bg-angel-blue bg-opacity-50 ring ring-angel-blue"
          : "bg-white outline-none"
      } ${className}`}
    >
      <input id={name} {...getInputProps()} />
      <DropzoneText files={value} />
    </div>
  );
}

function DropzoneText({ files }: { files: FileList }) {
  return !files?.length ? (
    <span className="flex items-center gap-1 text-dark-grey text-sm">
      <MdOutlineFileUpload className="text-lg" />
      Select file or Drag &amp; Drop
    </span>
  ) : (
    <span className="text-black text-sm">
      {Array.from(files)
        .map((file) => file.name)
        .join(", ")}
    </span>
  );
}
