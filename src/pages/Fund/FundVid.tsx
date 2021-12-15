export default function FundVid(props: { url: string }) {
  return (
    <iframe
      className="rounded-lg shadow-md h-full w-128"
      src={props.url.replace("watch?v=", "embed/")}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
