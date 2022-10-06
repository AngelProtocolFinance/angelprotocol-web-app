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
    setValue,
    control,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const imageFile: FileWrapper | undefined = watch(props.name);

  const initialImageRef = useRef<FileWrapper | undefined>(imageFile); //use to reset input internal state
  const inputRef = useRef<HTMLInputElement | null>(); // necessary to enable manual open of file input window

  const [isLoading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uncroppedImgUrl, setUncroppedImgUrl] = useState(""); // to use uncropped img version when cropping

  const openCropModal = useCallback(
    (onChange: OnChangeFunc) => () => {
      showModal(ImgCropper, {
        src: uncroppedImgUrl,
        aspectRatio: props.aspectRatioX / props.aspectRatioY,
        setCropedImage: (croppedBlob) => {
          // banner!.name !== undefined, because banner has to be set for it to be croppable
          const croppedValue: FileWrapper = {
            file: new File([croppedBlob], imageFile!.name, {
              type: croppedBlob.type,
            }),
            name: imageFile!.name,
          };
          onChange(croppedValue);
        },
      });
    },
    [
      showModal,
      uncroppedImgUrl,
      props.aspectRatioX,
      props.aspectRatioY,
      imageFile,
    ]
  );

  const fileReader = useMemo(() => {
    const fr = new FileReader();

    fr.onload = (e) => {
      const newImgUrl = e.target?.result?.toString() ?? "";
      setImageUrl(newImgUrl);
      if (!uncroppedImgUrl) {
        setUncroppedImgUrl(newImgUrl);
        // if it's loading the already submitted image (contains `publicUrl`)
        if (imageFile?.file) {
          openCropModal((croppedValue) =>
            setValue(props.name, croppedValue as any)
          )();
        }
      }
      setLoading(false);
    };

    fr.onerror = (e) => {
      handleError(e.target?.error, "failed to load image");
      setLoading(false);
    };

    return fr;
  }, [
    imageFile?.file,
    props.name,
    uncroppedImgUrl,
    handleError,
    openCropModal,
    setValue,
  ]);

  useEffect(() => {
    (async function () {
      if (!imageFile) {
        return;
      }

      // when first uploading an image on creation
      if (!initialImageRef.current) {
        initialImageRef.current = imageFile;
      }

      setLoading(true);

      const blob: Blob =
        imageFile.file ??
        (await fetch(imageFile.publicUrl).then((x) => x.blob()));

      fileReader.readAsDataURL(blob);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  useEffect(() => {
    if (uncroppedImgUrl) {
    }
  });

  const upload = useCallback(() => inputRef.current?.click(), []);

  const undo = useCallback(
    (onChange: OnChangeFunc) => () => {
      setUncroppedImgUrl(""); // will be read once the file is read in FileReader
      onChange(initialImageRef.current);
    },
    []
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
    isInitial: initialImageRef.current === imageFile,
    isLoading,
    isSubmitting,
    upload,
    undo,
    openCropModal,
    onInputChange,
  };
}
