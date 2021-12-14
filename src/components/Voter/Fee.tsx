import { useGetter } from "store/accessors";

export default function Fee() {
  const { fee } = useGetter((state) => state.transaction);

  return (
    <div className="flex justify-between items-center text-xs font-heading text-blue-accent mb-2">
      <p className="text-xs uppercase">tx fee</p>
      <p className="text-xs">{fee} UST</p>
    </div>
  );
}
