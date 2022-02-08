import { useHistory, useRouteMatch } from "react-router-dom";
import { registration } from "types/routes";
import banner1 from "assets/images/banner-register-1.jpg";
import Action from "../../components/ActionButton/Action";
import { useGetter, useSetter } from "store/accessors";
import { removeUserData } from "services/user/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ReferInfo, FormInfoSchema, useRegistration } from "./useRegistration";
import { useEffect, useState } from "react";

const Registration = () => {
  const [isLoading, setIsLoading] = useState(false);
  let userData = useGetter((state) => state.user);
  const dispatch = useSetter();
  const { onResume } = useRegistration();
  const { url } = useRouteMatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ refer: string }>({
    resolver: yupResolver(FormInfoSchema),
  });

  const onResumeRefer = async (values: ReferInfo) => {
    setIsLoading(true);
    await onResume(values);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userData.PK && userData.EmailVerified === false) {
      history.push({
        pathname: `${url}/${registration.confirm}`,
        state: { is_sent: true },
      });
    } else {
      dispatch(removeUserData());
    }
  }, []);

  return (
    <div>
      <div className="rounded-xl mb-5">
        <img src={banner1} width="100%" className="rounded-xl" alt="banner" />
      </div>
      <div>
        <span className="text-4xl font-bold">
          Thank you for registering, we'd love to have you on board!
        </span>
      </div>
      <div className="mb-10 mt-5">
        <span className="text-xl">
          You're just steps away from bringing all the benefits of endowments to
          your organization.
        </span>
      </div>
      <div className="mb-2">
        <Action
          onClick={() => history.push(`${url}/${registration.detail}`)}
          title="Start"
          classes="bg-orange w-48 h-12"
        />
        <div className="cursor-pointer mb-3">
          <p className="text-xl font-bold text-thin-blue">OR</p>
        </div>
      </div>
      <div className="">
        <form onSubmit={handleSubmit(onResumeRefer)}>
          <div className="flex items-center justify-center mb-2">
            <div className="rounded-md bg-white flex items-center w-3/5 md:w-2/5 text-black py-2">
              <input
                {...register("refer")}
                className="outline-none border-none w-full px-3"
                placeholder="Enter your registration reference"
                type="text"
                required
              />
            </div>
          </div>
          <p className="text-base text-failed-red">{errors.refer?.message}</p>
          <Action
            submit
            title="Resume"
            classes="bg-thin-blue w-48 h-12 mt-3"
            disabled={isLoading}
            isLoading={isLoading}
          />
        </form>
      </div>
      <p className="text-base mt-6">
        Can't find a registration file with this reference?
      </p>
    </div>
  );
};

export default Registration;
