import ExtLink from "components/ExtLink";
import { ArrowUpFromLine, LoaderCircle } from "lucide-react";

interface Props {
  value?: string | File;
}

export default function DropzoneText({ value }: Props) {
  if (value == null || value === "") {
    return (
      <div className="grid justify-items-center text-sm text-navy-l1 dark:text-navy-l2 select-none">
        <ArrowUpFromLine size={20} className="mb-[1.125rem]" />
        <p className="font-semibold mb-1">Upload file</p>
        <span>Click to Browse or Drag &amp; Drop</span>
      </div>
    );
  }
  if (value === "loading") {
    return (
      <div className="grid place-items-center">
        <LoaderCircle className="text-navy-l1 animate-spin" />
      </div>
    );
  }

  if (value instanceof File) {
    return (
      <p className="text-sm text-center block text-blue hover:text-blue-l1">
        {value.name}
      </p>
    );
  }
  return (
    <ExtLink
      onClickCapture={(ev) => ev.stopPropagation()}
      href={value}
      className="text-sm text-center block text-blue hover:text-blue-l1"
    >
      {value}
    </ExtLink>
  );
}
