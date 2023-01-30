type Props = {
  className?: string;
  disabled?: boolean;
  value: number;
  onChange(value: number): void;
};

export default function Slider({
  className = "",
  disabled,
  value,
  onChange,
}: Props) {
  return (
    <div className={`${className} select-none`}>
      <input
        className="range"
        value={value}
        onChange={(e) => onChange(e.target.valueAsNumber)}
        disabled={disabled}
        type="range"
      />
    </div>
  );
}
