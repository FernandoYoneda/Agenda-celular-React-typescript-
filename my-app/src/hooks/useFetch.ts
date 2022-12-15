import { useState, useEffect } from "react";

async function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  const response = await fetch(url, config);
  const data = await response.json();
  return data as TResponse;
}

export function useFetch<TResponse>(url: string) {
  const [data, setData] = useState<TResponse>();
  const [callFetch, setCallFetch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!callFetch) return;

    const fetchData = async () => {
      setLoading(true);

      const json = await request<TResponse>(url);

      setData(json);
      setCallFetch(false);
      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  return { data, reload: () => setCallFetch(true), loading };
}

