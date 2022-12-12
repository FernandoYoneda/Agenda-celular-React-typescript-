import { useState, useEffect } from "react";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// 4 - custom hook
export const useFetch = (url: string) => {
  const [data, setData] = useState([]);

  // 5 - refatorando post
  const [config, setConfig] = useState({});
  const [method, setMethod] = useState<Method>("GET");
  const [callFetch, setCallFetch] = useState(false);

  const httpconfig = (data: any, method: string) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);

      const json = await res.json();

      setData(json);
    };

    fetchData();
  }, [url, callFetch]);

  // 5 - refatorando post
  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        const res = await fetch(url, { method });
        const json = await res.json();

        setCallFetch(json);
      }
    };
    httpRequest();
  }, [config, method, url]);

  return { data, httpconfig };
};

