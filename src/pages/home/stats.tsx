export function Stats({ classes = "" }) {
  return (
    <div className={`${classes} grid md:grid-cols-3 gap-8`}>
      <div className="grid justify-items-center">
        <p className="text-3xl text-center font-bold text-blue">6 Million+</p>
        <p className="max-w-lg text-center mt-2 text-lg">
          Raised across crypto, stock, DAF, and card donations for nonprofit
          members.
        </p>
      </div>
      <div className="grid justify-items-center">
        <p className="text-3xl text-center font-bold text-blue">~24%</p>
        <p className="max-w-lg text-center mt-2 text-lg">
          Raised across crypto, stock, DAF, and card donations for nonprofit
          members.
        </p>
      </div>
      <div className="grid justify-items-center">
        <p className="text-3xl text-center font-bold text-blue">18,000+</p>
        <p className="max-w-lg text-center mt-2 text-lg">
          Causes discoverable across the Better Giving directory.
        </p>
      </div>
    </div>
  );
}
