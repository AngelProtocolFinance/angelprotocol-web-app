import { yupResolver } from "@hookform/resolvers/yup";
import { useController, useForm } from "react-hook-form";
import { schema, tokenShape } from "schemas/shape";
import { object, string } from "yup";
import { DEFAULT_PROGRAM, initTokenOption } from "../../common/constants";
import type { CryptoFormStep } from "../../types";
import type { DonateValues as DV } from "./types";

const initial: DV = {
  program: DEFAULT_PROGRAM,
  token: initTokenOption,
  chainId: "",
};

type Props = CryptoFormStep;
export function useRhf(props: Props) {
  const {
    reset,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DV>({
    defaultValues: props.details || initial,
    resolver: yupResolver(
      schema<DV>({
        token: object(tokenShape()),
        chainId: string().required("Please select network"),
        //no need to validate split, restricted by slider
      })
    ),
  });

  const { field: program } = useController<DV, "program">({
    control: control,
    name: "program",
  });
  const { field: chainId } = useController<DV, "chainId">({
    control: control,
    name: "chainId",
  });
  const { field: token } = useController<DV, "token">({
    control: control,
    name: "token",
  });

  return {
    program,
    chainId,
    reset,
    setValue,
    handleSubmit,
    token,
    errors: {
      token: errors.token?.amount?.message || errors.token?.token_id?.message,
      chainId: errors.chainId?.message,
    },
  };
}
