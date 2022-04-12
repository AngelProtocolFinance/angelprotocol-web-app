import React from "react";
import { IconType } from "react-icons";
import useImageEditor from "hooks/useImageEditor";
import { getIcon } from "components/Icons/Icons";
import Loader from "components/Loader/Loader";
import { UpdateProfilePayload as UP } from "contracts/types";

export default function ImageEditor() {
  const {
    handleFileChange,
    handleImageReset,
    loading,
    isInitial,
    inputRef,
    currentImage,
  } = useImageEditor<UP>("image");
  return (
    <div
      className={`grid place-items-center relative group w-full aspect-[4/1] p-1 rounded-md mb-4 bg-light-grey shadow-inner-white-grey`}
      style={{
        background: `no-repeat center/cover url(${currentImage})`,
      }}
    >
      {(loading && <LoadingOverlay />) || (
        <div className="hidden absolute group-hover:flex">
          <ImageControl
            type="upload"
            htmlFor="file__image"
            Icon={getIcon("Upload")}
            disabled={loading}
          />
          <ImageControl
            type="reset"
            onClick={handleImageReset}
            Icon={getIcon("Undo")}
            disabled={isInitial || loading}
          />
          <input
            ref={inputRef}
            disabled={loading}
            id="file__image"
            type="file"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/svg"
            className="w-0 h-0 appearance-none"
          />
        </div>
      )}
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
  const { Icon, type, ...valitAttrs } = props;
  return React.createElement(props.type === "reset" ? "button" : "label", {
    ...valitAttrs,
    className:
      "cursor-pointer text-white text-lg bg-angel-blue hover:bg-blue-accent disabled:bg-grey-accent/90 p-2 m-1 rounded-md shadow-lg",
    children: <Icon />,
  });
}

function LoadingOverlay() {
  return (
    <div className="absolute z-10">
      <Loader gapClass="gap-2" widthClass="w-3" bgColorClass="bg-angel-grey" />
    </div>
  );
}
