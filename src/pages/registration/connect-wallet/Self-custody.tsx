import { useHistory } from "react-router";
import { registration } from "types/routes";
import Action from "../../../components/ActionButton/Action";

const SelfCustody = () => {
  //url = app/register/self-custody
  const history = useHistory();
  // const showInfoModal = () => {};
  return (
    <div className="">
      <div className="title mb-5">
        <p className="text-3xl font-bold lg:w-4/5 mx-auto">
          We have prepared a detailed tutorial on how to create your own Terra
          wallet:
        </p>
      </div>
      <div className="text-center">
        <div className="flex items-center pt-3 justify-center mb-10">
          <button className="bg-thin-blue w-72 h-10 rounded-xl uppercase text-base font-bold text-white mr-1">
            take me to the tutorial
          </button>
          {/* <BsExclamationCircle
            className="text-xl text-thin-blue cursor-pointer"
            onClick={() => showInfoModal()}
          /> */}
        </div>
        <p className="text-sm">
          We have sent you an email with a link to resume your application once
          you're done with the wallet creation. Don't hesitate to{" "}
          <span className="text-orange cursor-pointer underline">
            get in touch
          </span>{" "}
          if you need help.
        </p>
      </div>
      <div className="mt-5">
        <Action
          onClick={() => history.push(registration.others)}
          title="Back"
          classes="bg-thin-blue w-48 h-10"
        />
      </div>
    </div>
  );
};

export default SelfCustody;
