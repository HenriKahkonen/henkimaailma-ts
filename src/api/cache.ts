const cache = new Map<string, unknown>();
const inflight = new Map<string, Promise<unknown>>();

export function getCached<T>(key: string): T | undefined {
    return cache.get(key) as T | undefined
}

/**
 * Function that fetches the requested data either from cache or by making an API call. Used API call must be provided as the fetcher function when calling the function
 * @param key Key of the data object in store
 * @param fetcher Fetcher function
 * @returns Either the promise of data or data, if it's already in cache
 */
export async function fetchWithCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  if (cache.has(key)) return cache.get(key) as T;
  /* If data is already being fetched but not finalized, use old promise */
  if (inflight.has(key)) return inflight.get(key) as Promise<T>;

  const promise = fetcher()
    .then((data) => {
      cache.set(key, data);
      inflight.delete(key);
      return data;
    })
    .catch((err) => {
      inflight.delete(key);
      throw err;
    });

  inflight.set(key, promise);
  return promise;
}