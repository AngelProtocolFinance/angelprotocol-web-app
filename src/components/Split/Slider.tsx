type Props = {
  className?: string;
  value: number;
  onChange(value: number): void;
};

export default function Slider({ className = "", value, onChange }: Props) {
  return (
    <div className={`${className} select-none`}>
      <input
        className="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={0}
        max={100}
        type="range"
      />
    </div>
  );
}
