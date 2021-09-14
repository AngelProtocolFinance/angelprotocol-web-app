type Props = {
  size: string; //tailwind height & width values
  thickness: string; //tailwind border width values
  color: string; //tailwind colors
};

export default function BlockLoader({ size, thickness, color }: Props) {
  return (
    <div
      className={`animate-spin rounded-full h-${size} w-${size} border-t-${thickness} border-b-${thickness} border-${color}`}
    ></div>
  );
}
