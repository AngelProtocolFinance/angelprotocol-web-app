import { ReactPlayer } from "components/react-player";

interface IVideo {
  classes?: string;
  url: string;
}
export function Video(props: IVideo) {
  return (
    /** @see https://github.com/CookPete/react-player/issues/145 */
    <div className="relative pt-[56.25%] aspect-16/9 rounded-lg overflow-clip">
      <ReactPlayer
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        url={props.url}
        width="100%"
        height="100%"
        controls
      />
    </div>
  );
}
