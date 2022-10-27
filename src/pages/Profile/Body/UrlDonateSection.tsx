import Icon from "components/Icon";
import { useProfileContext } from "../ProfileContext";
import useDonate from "./useDonate";

export default function UrlDonateSection({ className }: { className: string }) {
  const profile = useProfileContext();
  const donate = useDonate();

  return (
    <div
      className={`flex flex-col items-center justify-end gap-8 w-full lg:flex-row lg:gap-6 ${className}`}
    >
      {/* {profile.url && ( */}
      <span className="flex items-center justify-center gap-2 w-full font-sans font-medium text-sm sm:w-auto sm:text-base">
        <Icon type="Globe" className="h-5 w-5 sm:h-6 sm:w-6" />
        <a
          href={profile.url}
          title="organization url"
          className="cursor-pointer hover:underline"
        >
          {/* {profile.url.replace(/^https?:\/\//i, "")} */} www.example.com
        </a>
      </span>
      {/* )} */}
      <button
        onClick={donate}
        className="btn btn-orange w-full h-12 max-w-xs py-2 px-6 rounded text-sm normal-case"
      >
        Donate now
      </button>
    </div>
  );
}
