import { MileStone } from "types/aws";
import { Info } from "components/Status";
import Container from "../common/Container";

type Props = {
  classes?: string;
  milestones: MileStone[];
};

export default function Milestones({ classes = "", milestones }: Props) {
  return (
    <Container
      title="Milestones"
      classes={classes + " w-full lg:w-96"}
      expanded
    >
      {milestones.length > 0 ? (
        <></>
      ) : (
        <Info classes="m-6">No milestones found</Info>
      )}
    </Container>
  );
}
