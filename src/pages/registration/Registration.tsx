import { useState } from "react";

const Registration = () => {
  const [isResume, setIsResume] = useState(false);
  const [regRefer, setRegRefer] = useState("");

  const changeRefer = (event: any) => {
    setRegRefer(event.target.value);
  };
  return (
    <div>
      <div>
        <span className="text-2xl font-bold">
          Thank you for registering, we'd love to have you on board! You're just
          steps away from bringing all the benefits of endowments to your
          organization.
        </span>
      </div>
      <div className="my-10">
        <span className="text-xl">
          First, we need to collect information about you and your organization
          to prevent fraud. The registration only takes a few minutes and it can
          be interrupted and resumed as many times as necessary. We’ll be making
          it easy for you to come back to it.
        </span>
      </div>
      <div className="mb-2">
        <button className="bg-orange w-48 h-12 rounded-xl uppercase text-md font-bold text-white mb-7">
          Start
        </button>
        <div className="cursor-pointer" onClick={() => setIsResume(true)}>
          <p className="text-md underline">Or resume a previous registration</p>
        </div>
      </div>
      {isResume && (
        <div className="">
          <div className="flex items-center justify-center mb-2">
            <div className="mr-5 rounded-md bg-white flex items-center w-2/5 text-black py-2">
              <input
                type="text"
                className="outline-none border-none w-full px-3"
                placeholder="Enter your registration reference"
                onChange={changeRefer}
                value={regRefer}
              />
            </div>
            <button className="bg-orange w-48 h-12 rounded-xl uppercase text-md font-bold text-white">
              Resume
            </button>
          </div>
          <p className="text-md">
            Can't find a registration file with this reference!
          </p>
        </div>
      )}
    </div>
  );
};

export default Registration;
