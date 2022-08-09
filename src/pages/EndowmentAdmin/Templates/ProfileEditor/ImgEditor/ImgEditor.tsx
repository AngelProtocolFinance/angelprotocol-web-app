import React from "react";
import Icon, { IconTypes } from "components/Icon";
import Loader from "components/Loader";
import useImgEditor from "./useImgEditor";

export default function ImgEditor() {
  const {
    handleFileChange,
    handleImageReset,
    handleOpenCropper,
    loading,
    isInitial,
    inputRef,
    currentImage,
  } = useImgEditor();

  return (
    <div
      className="grid place-items-center relative group w-full aspect-[4/1] p-1 rounded-md mb-4 bg-light-grey shadow-inner-white-grey"
      style={{
        background: `no-repeat center/cover url(${currentImage})`,
      }}
    >
      {(loading && <LoadingOverlay />) || (
        <div className="hidden absolute group-hover:flex">
          <ImageControl
            type="upload"
            htmlFor="file__image"
            iconType="Upload"
            disabled={loading}
          />
          <ImageControl
            type="btn"
            onClick={handleImageReset}
            iconType="Undo"
            disabled={isInitial || loading}
          />
          <ImageControl
            type="btn"
            onClick={handleOpenCropper}
            iconType="Crop"
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

type Common = { iconType: IconTypes; disabled?: boolean };
type ControlProps =
  | { type: "upload"; onClick?: never; htmlFor: string }
  | {
      type: "btn";
      onClick: () => void;
      htmlFor?: never;
    };
function ImageControl(props: ControlProps & Common) {
  const { iconType, type, ...valitAttrs } = props;
  return React.createElement(props.type === "btn" ? "button" : "label", {
    ...valitAttrs,
    className:
      "cursor-pointer text-white text-lg bg-angel-blue hover:bg-blue-accent disabled:bg-grey-accent/90 p-2 m-1 rounded-md shadow-lg",
    children: <Icon type={iconType} />,
  });
}

function LoadingOverlay() {
  return (
    <div className="absolute z-10">
      <Loader gapClass="gap-2" widthClass="w-3" bgColorClass="bg-angel-grey" />
    </div>
  );
}
