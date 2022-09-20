import React from "react";
import { FieldValues, Path } from "react-hook-form";
import Icon from "components/Icon";
import Loader from "components/Loader";
import useImgEditor from "./useImgEditor";

type Props<T extends FieldValues> = {
  // we get common props with this intersection,
  // which are only props from T
  // (Path<T> returns all possible paths through T)
  name: Path<T> & keyof T;
  label: string;
};

export default function ImgEditor<T extends FieldValues>(props: Props<T>) {
  const {
    handleFileChange,
    handleImageReset,
    handleOpenCropper,
    error,
    isLoading,
    isInitial,
    inputRef,
    imageUrl,
  } = useImgEditor<T>(props.name);

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <label
        htmlFor={props.name}
        className="cursor-pointer text-dark-grey text-left"
      >
        {props.label}
        <span className="ml-0.5 text-failed-red">*</span>
      </label>
      <div
        className="grid place-items-center relative group w-full aspect-[4/1] p-1 rounded-md mb-4 bg-light-grey shadow-inner-white-grey"
        style={{
          background: `no-repeat center/cover url(${imageUrl})`,
        }}
      >
        {(isLoading && <LoadingOverlay />) || (
          <div className="hidden absolute group-hover:flex">
            <Button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isLoading}
            >
              <Icon type="Upload" />
            </Button>
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
              id={props.name}
              type="file"
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/svg"
              className="w-0 h-0 appearance-none"
            />
          </div>
        )}
      </div>
      {error && <p className="text-sm text-failed-red">{error}</p>}
    </div>
  );
}

const btnStyle =
  "cursor-pointer text-white text-lg bg-angel-blue hover:bg-blue-accent disabled:bg-grey-accent/90 p-2 m-1 rounded-md shadow-lg";

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={btnStyle} />;
}

function LoadingOverlay() {
  return (
    <div className="absolute z-10">
      <Loader gapClass="gap-2" widthClass="w-3" bgColorClass="bg-angel-grey" />
    </div>
  );
}
