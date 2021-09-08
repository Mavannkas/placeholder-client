import { useEffect } from "react";
import { TodoList } from "./components/todos/TodoList";
import { useHttp } from "./hooks/use-http";
import { getAllTodos } from "./lib/api";
import "./App.scss";
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
      <TodoList todos={result} />
    </>
  );
}

export default App;
