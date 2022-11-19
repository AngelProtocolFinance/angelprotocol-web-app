import useIsDoneLevel from "./useIsDoneLevel";

export type TLevel = 1 | 2 | 3;
export default function Level({ num }: { num: TLevel }) {
  const isDone = useIsDoneLevel(num);
  console.log({ num, isDone });
  return (
    <h4 className="flex items-center gap-2.5">
      <div
        className={`h-5 relative aspect-square border rounded-full before:content-[''] before:h-3 before:aspect-square before:absolute-center before:rounded-full ${
          isDone ? "before:bg-green" : ""
        }`}
      />
      <span className="text-lg font-bold">Level {num}</span>
    </h4>
  );
}
