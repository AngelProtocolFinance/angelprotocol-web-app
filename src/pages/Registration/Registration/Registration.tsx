import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import banner1 from "assets/images/banner-register-1.jpg";
import { useSetter } from "store/accessors";
import { Button } from "../common";
import routes from "../routes";
import { removeCharity } from "../store";
import ButtonMailTo from "./ButtonMailTo";
import useResume from "./useResume";

const FormInfoSchema = Yup.object().shape({
  refer: Yup.string().required("Please enter your registration reference."),
});

export default function Registration() {
  const resume = useResume();
  const navigate = useNavigate();
  const dispatch = useSetter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ refer: string }>({
    resolver: yupResolver(FormInfoSchema),
  });

  const handleStart = () => {
    dispatch(removeCharity());
    navigate(routes.contactDetails);
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <img src={banner1} width="100%" className="rounded-xl" alt="banner" />
      <span className="text-3xl font-bold">
        Thank you for registering, we'd love to have you on board!
      </span>
      <span className="text-xl mb-5">
        You're just steps away from bringing all the benefits of endowments to
        your organization.
      </span>
      <Button onClick={handleStart} className="bg-orange w-48 h-12">
        Start
      </Button>
      <p className="text-xl font-bold text-thin-blue">OR</p>
      <form
        onSubmit={handleSubmit(resume)}
        className="flex flex-col items-center gap-2 w-full mb-5"
      >
        <input
          {...register("refer")}
          className="rounded-md outline-none border-none w-3/5 md:w-2/5 px-3 py-2 text-black"
          placeholder="Enter your registration reference"
          type="text"
        />
        <p className="text-failed-red">{errors.refer?.message}</p>
        <Button
          submit
          className="bg-thin-blue w-48 h-12"
          isLoading={isSubmitting}
        >
          Resume
        </Button>
      </form>
      <ButtonMailTo
        label="Having trouble resuming your registration?"
        mailTo="support@angelprotocol.io"
        subject="Charity Registration: Trouble with confirmation email"
      />
    </div>
  );
}
