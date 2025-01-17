import type { IMedia } from "@better-giving/endowment";
import { Link, useFetcher } from "@remix-run/react";
import { ReactPlayer } from "components/react-player";
import { LoaderCircle, Minus, Pencil, Star } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

export default function VideoPreview(props: IMedia) {
  const del = useFetcher({ key: `delete-${props.id}` });
  const feat = useFetcher({ key: `feature-${props.id}` });
  const allControlsDisabled =
    del.state === "submitting" || feat.state === "submitting";

  return (
    <div className="text-navy-d4" key={props.id}>
      <div className="flex items-center justify-end mb-1">
        <CRUDBtn
          id={props.id}
          name="intent"
          value="feature"
          disabled={allControlsDisabled}
          featured={props.featured}
        >
          <Star
            size={19}
            className={`${
              props.featured ? "fill-[#FFA500] text-[#FFA500]" : ""
            } group-disabled:text-gray-l1 group-disabled:fill-gray-l1`}
          />
        </CRUDBtn>
        <Link
          aria-disabled={allControlsDisabled}
          to={{
            pathname: props.id,
            search: new URLSearchParams({
              prev_url: props.url,
            }).toString(),
          }}
          className="p-1.5 text-lg rounded-full hover:bg-blue-l4 group aria-disabled:text-gray-l1"
        >
          <Pencil size={16} />
        </Link>
        <CRUDBtn
          name="intent"
          value="delete"
          featured={props.featured}
          id={props.id}
          disabled={allControlsDisabled}
        >
          <Minus />
        </CRUDBtn>
      </div>
      {/** render only thumbnails on lists */}
      {/** @see https://github.com/CookPete/react-player/issues/145 */}
      <div className="relative pt-[56.25%] aspect-[16/9] rounded-lg overflow-clip">
        <ReactPlayer
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          url={props.url}
          width="100%"
          height="100%"
          light
          playIcon={<></>}
        />
      </div>
    </div>
  );
}

interface ICRUDBtn extends ButtonHTMLAttributes<HTMLButtonElement> {
  featured: boolean;
}
function CRUDBtn({ className, children, featured, ...props }: ICRUDBtn) {
  const fetcher = useFetcher({ key: `${props.value}-${props.id}` });
  return (
    <fetcher.Form method="POST" className="contents">
      <input type="hidden" name="featured" value={featured ? "1" : "0"} />
      <input type="hidden" name="mediaId" value={props.id} />
      <button
        type="submit"
        {...props}
        className={`p-1.5 text-lg rounded-full hover:bg-blue-l4 group disabled:text-gray-l1 group aria-disabled:text-gray-l1 ${className}`}
      >
        {fetcher.state === "submitting" ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          children
        )}
      </button>
    </fetcher.Form>
  );
}
