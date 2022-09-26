import { useProfile } from "pages/Profile";
import RichText from "components/RichTextEditor/RichText";

export default function Overview() {
  const profile = useProfile();
  return (
    <RichText
      content={profile?.overview || ""}
      readOnly
      classes={{
        container:
          "w-full bg-white text-angey-grey p-3 rounded-md lg:text-white/90 lg:bg-transparent lg:rounded-none lg:p-0 text-md mb-4",
      }}
    />
  );
}
