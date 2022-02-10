import React from "react";
import { useFormContext } from "react-hook-form";
import { IconType } from "react-icons";
import { AiOutlineUpload } from "react-icons/ai";
import { CgUndo } from "react-icons/cg";
import { EditableProfileAttr } from "./types";
import useChangeImage from "./useChangeImage";

export default function ImageEditor() {
  const { watch } = useFormContext<EditableProfileAttr>();
  const { handleFileChange, handleImageReset, loading, isInitial, inputRef } =
    useChangeImage();
  const charity_image = watch("charity_image");
  return (
    <div
      style={{
        background: `no-repeat center/cover url(${charity_image})`,
      }}
      className="grid place-items-center relative group bg-red-400 w-full h-48 p-1 rounded-md  "
    >
      <div className="flex absolute">
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
  const { Icon, ...valitAttrs } = props;
  return React.createElement(props.type === "reset" ? "button" : "label", {
    ...valitAttrs,
    className:
      "cursor-pointer text-white text-lg bg-angel-blue hover:bg-blue-accent disabled:bg-grey-accent bg-opacity-90 p-2 m-1 rounded-md shadow-lg",
    children: <Icon />,
  });
}
