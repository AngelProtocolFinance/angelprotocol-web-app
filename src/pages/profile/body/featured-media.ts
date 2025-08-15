import { $int_gte1 } from "@better-giving/schemas";
import { getMedia } from "api/get/media";
import { parse } from "valibot";

export async function featuredMedia(endowIdParam: string | undefined) {
  const id = parse($int_gte1, endowIdParam);

  return getMedia(id, { featured: true, type: "video" }).then(
    (data) => data.items
  );
}
