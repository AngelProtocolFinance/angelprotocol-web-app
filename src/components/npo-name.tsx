import use_swr from "swr/immutable";

const fetcher = async (path: string) => fetch(path).then((res) => res.json());
export function NpoName({ id }: { id: number | string }) {
  const { data, error } = use_swr(`/api/npos/${id}?fields=name`, fetcher);
  if (!data || error) return id;
  return `${id}: ${data.name}`;
}
