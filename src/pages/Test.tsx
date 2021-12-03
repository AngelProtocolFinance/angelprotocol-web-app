import AppHead from "components/Headers/AppHead";
import Voter from "components/Voter/Voter";
import VoterForm from "components/Voter/VoterForm";

export default function Test() {
  return (
    <div className="pb-16 grid grid-rows-a1 place-items-center">
      <AppHead />
      <Voter poll_id="5">
        <VoterForm />
      </Voter>
    </div>
  );
}
