import laira from "assets/laira/laira-face.png";
import Image from "components/image";
import useSWR from "swr/immutable";

interface Props {
  classes?: string;
  id: string;
}

interface Page {
  items: any[];
  nextPageKey: string | null;
}

const fetcher = ([, id, key]: [string, string, string | null]) =>
  fetch(`/api/npo/${id}/donors${key ? `?nextKey=${key}` : ""}`).then<Page>(
    (res) => res.json()
  );

export function DonorMsgs({ classes = "", id }: Props) {
  const { data, mutate, error } = useSWR(["txs", id, null], fetcher);

  if (error || !data) return null;
  const { items, nextPageKey } = data;
  if (items.length === 0) return null;

  async function load(nextKey: string) {
    const res = await fetcher(["txs", id, nextKey]);
    mutate(
      (x) => ({
        items: [...(x?.items || []), ...res.items],
        nextPageKey: res.nextPageKey,
      }),
      { revalidate: false }
    );
  }

  console.log(data);

  return (
    <div className={`${classes} w-full rounded-sm @container`}>
      <h2 className="text-xl font-bold mb-2">Donors</h2>
      <div className="grid gap-y-4 sm:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
        {items.map((donor) => (
          <div
            key={donor.id}
            className="flex bg-white items-start gap-4 border border-gray-l3 p-4 rounded-lg"
          >
            <Image
              src={donor.photo || laira}
              alt={donor.name}
              height={35}
              width={35}
              className="shrink-0 object-contain rounded-full"
            />

            <div>
              <p className="text-nowrap text-sm font-semibold">
                {donor.donor_name}
              </p>
              {donor.donor_message && (
                <p className="text-gray mt-1">{donor.donor_message}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {nextPageKey && (
        <button
          type="button"
          onClick={() => load(nextPageKey)}
          className="text-blue font-medium mt-4 hover:text-blue-d1"
        >
          View more
        </button>
      )}
    </div>
  );
}
