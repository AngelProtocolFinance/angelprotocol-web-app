export const cacheGet = async (url: RequestInfo | URL) => {
  return caches.open("bg").then(async (cache) => {
    const matched = await cache.match(url);
    if (matched) return matched.clone();

    const fresh = await fetch(url);
    await cache.put(url, fresh.clone());
    return fresh;
  });
};
