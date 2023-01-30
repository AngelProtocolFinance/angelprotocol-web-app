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
        className="slider"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        type="range"
      />
    </div>
  );
}
