export default function DAFDirect() {
  return (
    <>
      <h3 className="text-2xl sm:text-3xl text-center leading-relaxed">
        DAFDirect
      </h3>
      <p className="text-center">
        Donation using DAFDirect widget direct to Better Giving.
      </p>
      <iframe
        title="DAFDirect Widget"
        src="/dafdirect-widget.html"
        width="180"
        height="300"
      ></iframe>
    </>
  );
}
