import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { FileWrapper } from "components/FileDropzone";
import Icon from "components/Icon";
import Loader from "components/Loader";
import { logger } from "helpers";
import ImgCropper from "./ImgCropper";

type Props<T extends FieldValues> = {
  // we get common props with this intersection,
  // which are only props from T
  // (Path<T> returns all possible paths through T)
  name: keyof T & string;
  label: string;
  aspectRatio: number;
};

export default function ImgEditor<T extends FieldValues>(props: Props<T>) {
  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();
  const {
    watch,
    control,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const banner: FileWrapper = watch(props.name);

  const initialImageRef = useRef<FileWrapper>(banner); //use to reset input internal state
  const inputRef = useRef<HTMLInputElement | null>(); // necessary to enable manual open of file input window

  const [isLoading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uncroppedImgUrl, setUncroppedImgUrl] = useState(""); // to use uncropped img version when cropping

  const fileReader = useMemo(() => {
    const fr = new FileReader();

    fr.onload = (e) => {
      const newImgUrl = e.target?.result?.toString() ?? "";

      setImageUrl(newImgUrl);
      if (!uncroppedImgUrl) {
        setUncroppedImgUrl(newImgUrl);
      }

      setLoading(false);
    };

    fr.onerror = (e) => {
      logger.error("Failed to load image", e.target?.error?.message);
      handleError("failed to load image");
      setLoading(false);
    };

    return fr;
  }, [uncroppedImgUrl]);

  useEffect(() => {
    (async function () {
      if (!banner) {
        return;
      }

      setLoading(true);

      const blob: Blob =
        banner.file ?? (await fetch(banner.publicUrl).then((x) => x.blob()));

      fileReader.readAsDataURL(blob);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banner]);

  const isInitial = !initialImageRef.current.name;
  const isDisabled = isSubmitting || isLoading;

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
          <Controller
            name={props.name}
            control={control}
            render={({ field: { onChange, ref } }) => (
              <div className="hidden absolute group-hover:flex">
                <Button
                  onClick={() => inputRef.current?.click()}
                  disabled={isDisabled}
                >
                  <Icon type="Upload" />
                </Button>
                <Button
                  onClick={() => {
                    setUncroppedImgUrl(""); // will be read once the file is read in FileReader
                    onChange(initialImageRef.current);
                  }}
                  disabled={isInitial || isDisabled}
                >
                  <Icon type="Undo" />
                </Button>
                <Button
                  onClick={() => {
                    //cropper is disabled when imageFile is null
                    showModal(ImgCropper, {
                      src: uncroppedImgUrl,
                      aspectRatio: props.aspectRatio,
                      setCropedImage: (croppedBlob) => {
                        const croppedValue: FileWrapper = {
                          file: new File([croppedBlob], banner.name),
                          name: banner.name,
                        };
                        onChange(croppedValue);
                      },
                    });
                  }}
                  disabled={isInitial || isDisabled}
                >
                  <Icon type="Crop" />
                </Button>
                <input
                  ref={(e) => {
                    ref(e);
                    inputRef.current = e;
                  }}
                  disabled={isDisabled}
                  id={props.name}
                  type="file"
                  onChange={(e) => {
                    let fileWrapper: FileWrapper | undefined;
                    if (e.target.files && e.target.files.length > 0) {
                      fileWrapper = {
                        file: e.target.files[0],
                        name: e.target.files[0].name,
                      };
                    }

                    onChange(fileWrapper);
                    setUncroppedImgUrl(""); // will be read once the file is read in FileReader
                  }}
                  accept="image/png, image/jpeg, image/svg"
                  className="w-0 h-0 appearance-none"
                />
              </div>
            )}
          />
        )}
      </div>
      <ErrorMessage
        errors={errors}
        as="p"
        name={props.name}
        className="w-full text-xs text-failed-red text-center"
      />
    </div>
  );
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type="button"
      className="cursor-pointer text-white text-lg bg-angel-blue hover:bg-blue-accent disabled:bg-grey-accent/90 p-2 m-1 rounded-md shadow-lg"
    />
  );
}

function LoadingOverlay() {
  return (
    <div className="absolute z-10">
      <Loader gapClass="gap-2" widthClass="w-3" bgColorClass="bg-angel-grey" />
    </div>
  );
}
