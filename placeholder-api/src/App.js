import { useEffect } from "react";
import { useHttp } from "./hooks/use-http";
import { getAllTodos } from "./lib/api";

function App() {
  const { isLoading, result, error, sendRequest } = useHttp(getAllTodos, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Sth is wrong...</p>;
  }

  return (
    <>
      {result.map((item) => (
        <div>{item.title}</div>
      ))}
    </>
  );
}

export default App;
