import Image from "components/Image";

export default function NoDonations({ classes = "" }) {
  return (
    <div
      className={`${classes} max-sm:text-center grid sm:grid-cols-[1fr_auto] max-w-md gap-y-2 gap-x-4`}
    >
      <Image
        alt="someone looking for an object"
        src="/images/not-found.png"
        className="max-sm:place-self-center sm:col-start-2 sm:row-start-1 sm:row-span-2 rounded-full w-48 object-cover object-center"
      />
      <h3 className="text-lg self-end">No donations found.</h3>
      <p className="self-start text-navy-l1 dark:text-gray">
        Sorry! We couldn't find any donations. Try to adjust any filters applied
        or connect with a different user.
      </p>
    </div>
  );
}
