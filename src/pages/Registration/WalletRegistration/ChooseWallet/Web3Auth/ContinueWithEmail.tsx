import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Button } from "./ButtonSocial";

type FormData = { email: string };

const SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email."),
});

type Props = { onClick: (value: string) => void };

export default function ContinueWithEmail({ onClick }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(SCHEMA),
    defaultValues: {
      email: "",
    },
  });

  const handleClick = useCallback(
    (formData: FormData) => onClick(formData.email),
    [onClick]
  );

  const error = useMemo(() => errors?.email?.message, [errors?.email?.message]);

  return (
    <form
      className={`flex flex-col ${error ? "gap-1" : "gap-3"}`}
      onSubmit={handleSubmit(handleClick)}
    >
      <div className="flex flex-col">
        <input
          className="flex h-12 w-full justify-center rounded-sm pl-4 outline-none bg-white text-angel-grey text-sm"
          placeholder="Enter your email"
          {...register("email")}
        />
        {error && <p className="text-sm text-failed-red">{error}</p>}
      </div>
      <Button
        type="submit"
        className={`bg-white/40 disabled:bg-white/75 ${
          !isSubmitting ? "hover:bg-white/50" : "cursor-auto"
        }`}
        disabled={isSubmitting}
      >
        Continue with Email
      </Button>
    </form>
  );
}
