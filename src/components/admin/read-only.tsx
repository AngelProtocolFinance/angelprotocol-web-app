type KeyValueProps = {
  name: string;
  value?: string;
};
export function KeyValue({ name, value }: KeyValueProps) {
  return (
    <div className="grid gap-y-2">
      <p className="font-bold text-sm">{name}</p>
      <p>{value ?? "not set"}</p>
    </div>
  );
}
