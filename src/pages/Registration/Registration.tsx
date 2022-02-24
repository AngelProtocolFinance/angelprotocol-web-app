import { yupResolver } from "@hookform/resolvers/yup";
import banner1 from "assets/images/banner-register-1.jpg";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useRouteMatch } from "react-router-dom";
import { removeUserData } from "services/user/userSlice";
import { useSetter } from "store/accessors";
import Button from "./Button";
import routes from "./routes";
import { FormInfoSchema, useRegistration } from "./useRegistration";

const Registration = () => {
  const { onResume } = useRegistration();
  const { url } = useRouteMatch();
  const history = useHistory();
  const dispatch = useSetter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ refer: string }>({
    resolver: yupResolver(FormInfoSchema),
  });

  const handleStart = useCallback(
    () => history.push(`${url}/${routes.contactDetails}`),
    [history, url]
  );

  useEffect(() => {
    dispatch(removeUserData());
  }, [dispatch]);

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
        onSubmit={handleSubmit(onResume)}
        className="flex flex-col items-center gap-2 w-full"
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
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Resume
        </Button>
      </form>
      <p className="mt-5">
        Can't find a registration file with this reference?
      </p>
    </div>
  );
};

export default Registration;
