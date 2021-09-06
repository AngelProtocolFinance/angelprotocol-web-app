type Props = {
  size: number;
  thickness: number;
  color: string;
};

export default function BlockLoader({ size, thickness, color }: Props) {
  return (
    <div
      className={`animate-spin rounded-full h-${size} w-${size} border-t-${thickness} border-b-${thickness} border-${color}`}
    ></div>
  );
}
