import { useProfileContext } from "../ProfileContext";

export default function Body() {
  const profile = useProfileContext();

  return (
    <div className="grid grid-rows-[auto_auto_1fr] grid-cols-[auto_auto] gap-10 items-end w-full h-full pt-6 px-20 pb-20 bg-white dark:bg-blue-d4">
      <div className="col-span-2 flex items-center justify-end gap-6">
        website + button
      </div>
      <div className="flex items-center justify-end gap-6">name + address</div>
      <div className="flex items-center justify-end gap-6 w-[810px]">
        balances
      </div>
      <div className="col-span-2 w-full h-40">Overview</div>
    </div>
  );
}
