import { useEffect, useState } from "react";
import { fetchWithCache, getCached } from "./cache";

interface ResourceState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

/**
 * Generic function for data that needs an API call to be fetched that returns either the promise of data or the actual data from cache using the supplied
 * @param key Key of data to query
 * @param fetcher The actual REST call function to use as the fetching function
 * @returns promise of data, loading, error
 */
export function useApiResource<T>(key: string, fetcher: () => Promise<T>): ResourceState<T> {
    const [data, setData] = useState<T | null>(() => getCached<T>(key) ?? null);
    const [loading, setLoading] = useState(data === null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cached = getCached<T>(key);
        if (cached !== undefined) {
            setData(cached);
            setLoading(false);
            return;
        }

        let cancelled = false;
        setLoading(true);
        fetchWithCache(key, fetcher)
            .then((result) => { if (!cancelled) setData(result); })
            .catch((err: Error) => { if (!cancelled) setError(err.message); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [key]) ;

    return { data, loading, error};
}