import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  multiple?: true | boolean;
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

function Dropzone({ name, multiple, onDrop, value }: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={`rounded-md border-none w-full px-2 py-1 text-black ${
        isDragActive
          ? "bg-angel-blue bg-opacity-50 ring ring-angel-blue"
          : "bg-white outline-none"
      }`}
    >
      <input id={name} {...getInputProps()} />
      <DropzoneText files={value} />
    </div>
  );
}

function DropzoneText({ files }: { files: FileList }) {
  return !files?.length ? (
    <p className="text-dark-grey">Select file or Drag &amp; Drop</p>
  ) : (
    <p className="text-black">
      {Array.from(files)
        .map((file) => file.name)
        .join(", ")}
    </p>
  );
}
