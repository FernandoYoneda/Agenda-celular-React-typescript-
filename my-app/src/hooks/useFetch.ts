import { useState, useEffect } from "react";

// 4 - custom hook
export const useFetch = (url: string) => {
  const [data, setData] = useState([]);

  // 5 - refatorando post
  const [callFetch, setCallFetch] = useState(true);


  useEffect(() => {
    if (!callFetch ) return

    const fetchData = async () => {
      const res = await fetch(url);

      const json = await res.json();

      setData(json);
      setCallFetch(false)
    };

    fetchData();
  }, [url, callFetch]);

  return { data, reload: () => setCallFetch(true) };
};