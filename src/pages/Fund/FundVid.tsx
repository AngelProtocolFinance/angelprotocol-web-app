//future props --youtube -id
export default function FundVid() {
  return (
    <div
      className={`col-start-2 col-span-1 w-video:sm youtube-wrapper ml-2 rounded-xl overflow-hidden shadow-md`}
    >
      <iframe
        className="youtube-iframe"
        src="https://www.youtube.com/embed/jx1GsOSN1Fs"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
