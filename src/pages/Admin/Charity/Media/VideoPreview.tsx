import type { IMedia } from "@better-giving/endowment";
import { LoaderCircle, Minus, Pencil, Star } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import ReactPlayer from "react-player";
import { Link, useFetcher } from "react-router-dom";

export default function VideoPreview(props: IMedia) {
  const fetcher = useFetcher();
  const allControlsDisabled = fetcher.state !== "idle";
  return (
    <div className="text-navy-d4" key={props.id}>
      <fetcher.Form
        action="."
        method="post"
        className="flex items-center justify-end mb-1"
      >
        <input
          type="hidden"
          name="featured"
          value={props.featured ? "1" : "0"}
        />
        <input type="hidden" name="mediaId" value={props.id} />
        <CRUDBtn
          type="submit"
          name="intent"
          value="feature"
          isLoading={fetcher.state === "submitting"}
          disabled={allControlsDisabled}
        >
          <Star
            size={19}
            className={`${
              props.featured ? "text-[#FFA500]" : ""
            } group-disabled:text-gray-l1`}
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
          type="submit"
          disabled={allControlsDisabled}
          isLoading={fetcher.state === "submitting"}
        >
          <Minus />
        </CRUDBtn>
      </fetcher.Form>
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

function CRUDBtn({
  className,
  isLoading,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
}) {
  return (
    <button
      {...props}
      className={`p-1.5 text-lg rounded-full hover:bg-blue-l4 group disabled:text-gray-l1 group aria-disabled:text-gray-l1 ${className}`}
    >
      {isLoading ? <LoaderCircle className="animate-spin" /> : children}
    </button>
  );
}
