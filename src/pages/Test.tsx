import { useLeaderboardsQuery } from "services/aws/leaderboard/leaderboard";
// import Voter from "components/Voter/Voter";
// import VoterForm from "components/Voter/VoterForm";
// import { useGovStaker } from "services/terra/hooks";
export default function Test() {
  const { data } = useLeaderboardsQuery(true);
  console.log(data);
  return (
    <div className="grid place-items-center">
      {/* <Voter poll_id="5">
        <VoterForm />
      </Voter> */}
    </div>
  );
}
