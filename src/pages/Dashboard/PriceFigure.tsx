export default function PriceFigure({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="border border-white/10 py-2 px-5 rounded-md bg-white/10">
      <h1 className="font-heading font-bold mb-1 uppercase text-white-grey">
        {title}
      </h1>
      <h4 className="font-bold text-white-grey/80">{value} HALO</h4>
    </div>
  );
}
