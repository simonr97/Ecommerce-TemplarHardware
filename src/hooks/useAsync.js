import { useState, useEffect } from "react";

export const useAsync = (asyncFunc, dependencies = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!Array.isArray(dependencies)) {
    console.error("No es un array de dependencias");
    dependencies = [];
  }

  useEffect(() => {
    setLoading(true);

    asyncFunc()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies); //eslint-disable-line

  return { data, error, loading };
};
