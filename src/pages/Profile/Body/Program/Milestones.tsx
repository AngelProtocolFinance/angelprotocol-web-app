import Container from "../common/Container";

export default function Milestones({ classes = "" }) {
  return (
    <Container
      title="Milestones"
      classes={classes + " w-full lg:w-96"}
      expanded
    >
      milestones
    </Container>
  );
}
