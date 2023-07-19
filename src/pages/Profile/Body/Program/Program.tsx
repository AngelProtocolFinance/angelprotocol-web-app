import Container from "../common/Container";

export default function Program({ className = "" }) {
  return (
    <div
      className={`${className} grid grid-rows-[auto_auto] gap-8 w-full h-full lg:grid-rows-1 lg:grid-cols-[1fr_auto]`}
    >
      <Container title="Programs" expanded>
        hello world
      </Container>
      <div className="self-start lg:sticky lg:top-28">milestones</div>
    </div>
  );
}
