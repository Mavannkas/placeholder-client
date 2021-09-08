import { useCallback, useState } from "react";

export const useHttp = (apiFunction, isLoadingOnStart = false) => {
  const [isLoading, setIsLoading] = useState(isLoadingOnStart);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (id, body) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiFunction(id, body);
        setResult(response);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction]
  );

  return {
    isLoading,
    result,
    error,
    sendRequest,
  };
};
