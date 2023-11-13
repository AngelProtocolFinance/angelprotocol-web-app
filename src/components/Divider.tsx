export default function Divider({ vertical = false }) {
  return (
    <div
      className={`bg-gray-l3 dark:bg-bluegray ${
        vertical ? "w-px h-full" : "h-px w-full"
      }`}
    />
  );
}
