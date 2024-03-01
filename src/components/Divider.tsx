export default function Divider({ vertical = false }) {
  return (
    <div
      className={`bg-gray-l3 dark:bg-navy ${
        vertical ? "w-px h-full" : "h-px w-full"
      }`}
    />
  );
}
