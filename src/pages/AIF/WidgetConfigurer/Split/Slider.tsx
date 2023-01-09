type Props = {
  className?: string;
  value: number;
  onChange(newValue: number): void;
};

export default function Slider({ value, className = "", onChange }: Props) {
  return (
    <div className={`${className} select-none`}>
      <input
        className="slider"
        onChange={(e) => onChange(Number(e.target.value))}
        min={0}
        max={100}
        type="range"
        value={value}
      />
    </div>
  );
}
