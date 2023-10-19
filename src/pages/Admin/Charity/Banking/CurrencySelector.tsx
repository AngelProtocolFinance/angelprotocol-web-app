export default function CurrencySelector({
  value,
  onChange,
}: {
  value?: string;
  onChange: (currency: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span>Current currency: {value}</span>
      <div className="flex gap-2">
        <button
          onClick={() => onChange("USD")}
          className="btn-orange text-sm w-40"
        >
          USD
        </button>
        <button
          onClick={() => onChange("GBP")}
          className="btn-orange text-sm w-40"
        >
          GBP
        </button>
        <button
          onClick={() => onChange("EUR")}
          className="btn-orange text-sm w-40"
        >
          EUR
        </button>
        <button
          onClick={() => onChange("KRW")}
          className="btn-orange text-sm w-40"
        >
          KRW
        </button>
      </div>
    </div>
  );
}
