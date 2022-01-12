type Props = { url: string; className: string };

export default function FundVid({ url, className }: Props) {
  return (
    <iframe
      className={`${className} rounded-lg shadow-md h-full w-128`}
      src={url.replace("watch?v=", "embed/")}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
