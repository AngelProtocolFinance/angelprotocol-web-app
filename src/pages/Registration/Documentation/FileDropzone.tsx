import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type FilesObject = {
  [x: string]: File;
};

type Props = { name: string };

export default function FileDropzone({ name }: Props) {
  const [files, setFiles] = useState<FilesObject>({});

  const onDrop = useCallback((uploadedFiles) => setFiles(uploadedFiles), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
      {!files.length ? <Placeholder /> : <FileNames filesObject={files} />}
    </div>
  );
}

const Placeholder = () => (
  <p className="text-dark-grey">Select file or Drag &amp; Drop</p>
);

const FileNames = ({ filesObject }: { filesObject: FilesObject }) => (
  <p className="text-black">
    {Object.values(filesObject)
      .map((file) => `${file.name}.${file.type}`)
      .join(", ")}
  </p>
);
