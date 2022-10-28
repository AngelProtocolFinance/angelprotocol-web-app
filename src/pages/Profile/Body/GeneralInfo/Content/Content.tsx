import { useProfileContext } from "pages/Profile/ProfileContext";
import { RichTextView } from "components/RichText";
import Container from "./Container";

export default function Content() {
  const profile = useProfileContext();

  return (
    <div className="flex flex-col gap-8 w-full h-full">
      <Container title="Overview">
        <RichTextView
          value={profile.overview}
          classes={{ container: "w-full h-full px-8 py-10" }}
        />
      </Container>
    </div>
  );
}
