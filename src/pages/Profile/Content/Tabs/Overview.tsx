import { useProfile } from "pages/Profile";
import RichTextRenderer from "components/RichTextRenderer";

export default function Overview() {
  const profile = useProfile();
  return (
    <div className="w-full  bg-white text-angey-grey p-3 rounded-md lg:text-white/90 lg:bg-transparent lg:rounded-none lg:p-0 text-md mb-4">
      <RichTextRenderer text={profile.overview || ""} />
    </div>
  );
}
