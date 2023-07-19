import RichText from "components/RichText";
import { useProfileContext } from "../../../ProfileContext";
import Container from "./Container";
import Programs from "./Programs";

export default function Content() {
  const profile = useProfileContext();

  return (
    <div className="flex flex-col gap-8 w-full h-full">
      <Container title="Overview">
        <RichText
          content={profile.overview ?? ""}
          classes={{ container: "w-full h-full px-8 py-10" }}
          readOnly
        />
      </Container>
      {profile.program.length > 0 && (
        <Container title="Programs">
          <Programs />
        </Container>
      )}
    </div>
  );
}
