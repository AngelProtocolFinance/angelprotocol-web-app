import { getMedia } from "api/get/media";
import { plusInt } from "api/schema/endow-id";
import { parse } from "valibot";

export async function featuredMedia(endowIdParam: string | undefined) {
  const id = parse(plusInt, endowIdParam);

  return getMedia(id, { featured: true, type: "video" }).then(
    (data) => data.items
  );
}
