type Props = {
  id: string;
  classes?: string;
};
export default function Reference({ id, classes = "" }: Props) {
  return (
    <div
      className={`${classes} w-full py-4 px-6 text-sm text-left md:text-center bg-gray-l5 dark:bg-blue-d4 text-gray-d2 dark:text-white md:text-gray-d1 md:dark:text-gray md:border-t border-gray-l2 dark:border-bluegray rounded-b-lg`}
    >
      <span className="font-semibold">Your registration number:</span>
      <span className="block mt-1 md:inline md:mt-0">{id}</span>
    </div>
  );
}
