type Props = {
  className?: string;
  onChange(newValue: number): void;
};

export default function Slider({ className = "", onChange }: Props) {
  return (
    <div className={`${className} select-none`}>
      <input
        type="range"
        onChange={(e) => onChange(Number(e.target.value))}
        min={0}
        max={100}
        className="slider"
      />
    </div>
  );
}
