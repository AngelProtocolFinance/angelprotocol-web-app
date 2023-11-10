export default function ContentLoader({ className = "" }) {
  return (
    <div
      className={
        className + " bg-gray-l3 dark:bg-bluegray animate-pulse rounded"
      }
    />
  );
}
