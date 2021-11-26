import AppHead from "components/Headers/AppHead";
import StakeForm from "components/StakeForm/StakeForm";
import Staker from "components/Staker/Staker";

export default function Test() {
  return (
    <div className="pb-16 grid grid-rows-a1 place-items-center">
      <AppHead />
      <Staker>
        <StakeForm />
      </Staker>
    </div>
  );
}
