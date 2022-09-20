import React from "react";
import Icon from "components/Icon";
import Loader from "components/Loader";
import useImgEditor from "./useImgEditor";

export default function ImgEditor() {
  const {
    handleFileChange,
    handleImageReset,
    handleOpenCropper,
    isLoading,
    isInitial,
    inputRef,
    imageUrl,
  } = useImgEditor();

  return (
    <div
      className="grid place-items-center relative group w-full aspect-[4/1] p-1 rounded-md mb-4 bg-light-grey shadow-inner-white-grey"
      style={{
        background: `no-repeat center/cover url(${imageUrl})`,
      }}
    >
      {(isLoading && <LoadingOverlay />) || (
        <div className="hidden absolute group-hover:flex">
          <Label htmlFor="file__image">
            <Icon type="Upload" />
          </Label>
          <Button
            type="button"
            onClick={handleImageReset}
            disabled={isInitial || isLoading}
          >
            <Icon type="Undo" />
          </Button>
          <Button
            type="button"
            onClick={handleOpenCropper}
            disabled={isInitial || isLoading}
          >
            <Icon type="Crop" />
          </Button>
          <input
            ref={inputRef}
            disabled={isLoading}
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

const btnStyle =
  "cursor-pointer text-white text-lg bg-angel-blue hover:bg-blue-accent disabled:bg-grey-accent/90 p-2 m-1 rounded-md shadow-lg";
function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={btnStyle} />;
}

function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className={btnStyle} />;
}

function LoadingOverlay() {
  return (
    <div className="absolute z-10">
      <Loader gapClass="gap-2" widthClass="w-3" bgColorClass="bg-angel-grey" />
    </div>
  );
}
