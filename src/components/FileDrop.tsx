import { useDropzone } from "react-dropzone";
import { FieldValues, Path, useController } from "react-hook-form";
import { FileObject } from "types/aws";
import Icon from "components/Icon";

export type FileLink = FileObject & { file: File };
type BaseFormValue = { [index: string]: FileLink[] };

type Key = keyof FileLink;
const fileKey: Key = "file";

export default function FileDrop<
  T extends FieldValues,
  K extends Path<T>
>(props: {
  fieldName: T[K] extends FileLink[] ? K : never;
  multiple?: true;
  disabled?: boolean;
  className?: string;
}) {
  const id = `${props.fieldName}.${fileKey}`;

  const {
    field: { value: files, onChange: onFilesChange },
  } = useController<BaseFormValue>({ name: id });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      onFilesChange(files);
    },
    multiple: props.multiple,
    disabled: props.disabled,
  });

  const className = `flex items-center rounded-md border-none w-full px-2 py-1 text-black ${
    isDragActive ? "bg-blue/50 ring ring-blue" : "bg-white outline-none"
  } ${props.className} ${
    props.disabled ? "cursor-default bg-gray/40" : "cursor-pointer"
  }`;

  return (
    <div {...getRootProps({ className })}>
      <input id={id} {...getInputProps()} />
      <DropzoneText fileLinks={files} />
    </div>
  );
}

function DropzoneText({ fileLinks }: { fileLinks: FileLink[] }) {
  if (fileLinks.length <= 0) {
    return (
      <span className="flex items-center gap-1 text-dark-grey text-sm">
        <Icon type="Upload" className="text-lg" />
        Select file or Drag &amp; Drop
      </span>
    );
  }

  const fileNames = fileLinks
    .map(({ file, name }) => file?.name || name)
    .join(", ");

  return fileLinks.length <= 0 ? (
    <span className="flex items-center gap-1 text-dark-grey text-sm">
      <Icon type="Upload" className="text-lg" />
      Select file or Drag &amp; Drop
    </span>
  ) : (
    <label className="flex text-black text-sm truncate" title={fileNames}>
      {fileNames}
    </label>
  );
}
