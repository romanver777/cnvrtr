import { useState, useEffect, useCallback } from "react";
import axios from "axios";

type TData = {
  [key: string]: number;
};

export const useFetch = (url: string): [TData, boolean, string] => {
  const [data, setData] = useState<TData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);
      
      setData(response.data.rates);
      setLoading(false);
      setError("");
    } catch (error) {
      setError((error as Error).message);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData, url]);

  return [data, loading, error];
};
