import type { ClientLoaderFunction } from "@remix-run/react";
import { cacheClientLoader } from "remix-client-cache";
export { useCachedLoaderData } from "remix-client-cache";
export const clientLoader: ClientLoaderFunction = (args) =>
  cacheClientLoader(args);
clientLoader.hydrate = true;
