import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { Props } from "./types";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { FileWrapper } from "components/FileDropzone";
import ImgCropper from "./ImgCropper";

type OnChangeFunc = (...event: any[]) => void;

export default function useImgEditor<T extends FieldValues>(props: Props<T>) {
  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();
  const {
    watch,
    control,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const banner: FileWrapper | undefined = watch(props.name);

  const initialImageRef = useRef<FileWrapper | undefined>(banner); //use to reset input internal state
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
      handleError(e.target?.error, "failed to load image");
      setLoading(false);
    };

    return fr;
  }, [uncroppedImgUrl, handleError]);

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

  const onUpload = useCallback(() => inputRef.current?.click(), []);

  const onUndo = useCallback(
    (onChange: OnChangeFunc) => () => {
      setUncroppedImgUrl(""); // will be read once the file is read in FileReader
      onChange(initialImageRef.current);
    },
    []
  );

  const onCrop = useCallback(
    (onChange: OnChangeFunc) => () => {
      //cropper is disabled when imageFile is null
      showModal(ImgCropper, {
        src: uncroppedImgUrl,
        aspectRatio: props.aspectRatioX / props.aspectRatioY,
        setCropedImage: (croppedBlob) => {
          // banner!.name !== undefined, because banner has to be set for it to be croppable
          const croppedValue: FileWrapper = {
            file: new File([croppedBlob], banner!.name, {
              type: croppedBlob.type,
            }),
            name: banner!.name,
          };
          onChange(croppedValue);
        },
      });
    },
    [props.aspectRatioX, props.aspectRatioY, banner, uncroppedImgUrl, showModal]
  );

  const onInputChange = useCallback(
    (onChange: OnChangeFunc) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let fileWrapper: FileWrapper | undefined;
      if (e.target.files && e.target.files.length > 0) {
        fileWrapper = {
          file: e.target.files[0],
          name: e.target.files[0].name,
        };
      }

      onChange(fileWrapper);
      setUncroppedImgUrl(""); // will be read once the file is read in FileReader
    },
    []
  );

  return {
    control,
    errors,
    inputRef,
    imageUrl,
    isInitial: initialImageRef.current === banner,
    isLoading,
    isSubmitting,
    onUpload,
    onUndo,
    onCrop,
    onInputChange,
  };
}
