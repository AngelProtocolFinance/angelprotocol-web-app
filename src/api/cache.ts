import type { ClientLoaderFunction } from "@remix-run/react";
import { cacheClientLoader, createCacheAdapter } from "remix-client-cache";
export { useCachedLoaderData } from "remix-client-cache";
const { adapter } = createCacheAdapter(() => localStorage);
export const clientLoader: ClientLoaderFunction = (args) =>
  cacheClientLoader(args, { adapter });
clientLoader.hydrate = true;
