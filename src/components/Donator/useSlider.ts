import { Values } from "components/Donator/types";
import { useFormikContext } from "formik";

export default function useSlider() {
  const { setFieldValue, values } = useFormikContext<Values>();
  return {
    percentage: values.split,
    handleSlide: (value: number) => setFieldValue("split", value),
    handleSlideEnd: (value: number) => setFieldValue("split", value),
  };
}
