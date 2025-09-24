import { useCallback, useEffect, useRef, useState } from 'react';

export function useFetch<T>(url: string | null, interval?: number) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  const fetcher = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const json = await res.json();
      if (!mounted.current) return;
      setData(json as T);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    mounted.current = true;
    fetcher();
    let timer: any;
    if (interval && url) timer = setInterval(fetcher, interval);
    return () => {
      mounted.current = false;
      if (timer) clearInterval(timer);
    };
  }, [fetcher, interval, url]);

  return { data, loading, error, refetch: fetcher };
}
