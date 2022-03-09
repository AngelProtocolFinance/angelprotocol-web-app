import React from "react";
import { IconType } from "react-icons";
import { CgUndo } from "react-icons/cg";
import { AiOutlineUpload } from "react-icons/ai";
import { useFormContext } from "react-hook-form";
import useImageEditor from "hooks/useImageEditor";
import { ErrorMessage } from "@hookform/error-message";
import { MemberAdderValues as V } from "./schema";

export default function IconEditor() {
  const {
    watch,
    formState: { errors },
  } = useFormContext<V>();
  const { handleFileChange, handleImageReset, loading, isInitial, inputRef } =
    useImageEditor<V>("icon");
  const allianceIcon = watch("icon");
  return (
    <>
      <ErrorMessage
        errors={errors}
        name={"icon"}
        as="p"
        className="font-mono font-semibold text-left text-red-400 text-xs"
      />
      <div
        style={{
          background: `no-repeat center/cover url(${allianceIcon})`,
        }}
        className="grid place-items-center relative group bg-red-400 w-32 aspect-square rounded-md mb-4 border-2"
      >
        <div className="hidden absolute group-hover:flex">
          <ImageControl
            type="upload"
            htmlFor="file__image"
            Icon={AiOutlineUpload}
            disabled={loading}
          />
          <ImageControl
            type="reset"
            onClick={handleImageReset}
            Icon={CgUndo}
            disabled={isInitial || loading}
          />
          <input
            ref={inputRef}
            id="file__image"
            type="file"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/svg"
            className="w-0 h-0 appearance-none"
          />
        </div>
      </div>
    </>
  );
}

type Common = { Icon: IconType; disabled?: boolean };
type ControlProps =
  | { type: "upload"; onClick?: never; htmlFor: string }
  | {
      type: "reset";
      onClick: () => void;
      htmlFor?: never;
    };
function ImageControl(props: ControlProps & Common) {
  const { Icon, type, ...valitAttrs } = props;
  return React.createElement(props.type === "reset" ? "button" : "label", {
    ...valitAttrs,
    className:
      "cursor-pointer text-white text-lg bg-angel-blue hover:bg-blue-accent disabled:bg-grey-accent bg-opacity-90 p-2 m-1 rounded-md shadow-lg",
    children: <Icon />,
  });
}
