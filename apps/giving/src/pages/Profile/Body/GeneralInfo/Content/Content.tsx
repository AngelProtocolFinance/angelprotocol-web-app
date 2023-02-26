import RichText from "@giving/components/RichText";
import { useProfileContext } from "../../../ProfileContext";
import Container from "./Container";

export default function Content() {
  const profile = useProfileContext();

  return (
    <div className="flex flex-col gap-8 w-full h-full">
      <Container title="Overview">
        <RichText
          content={profile.overview}
          classes={{ container: "w-full h-full px-8 py-10" }}
          readOnly
        />
      </Container>
    </div>
  );
}
