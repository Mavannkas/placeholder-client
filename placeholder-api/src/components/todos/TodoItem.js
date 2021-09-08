import { useEffect } from "react";
import { useHttp } from "../../hooks/use-http";
import { getUser } from "../../lib/api";

export const TodoItem = (props) => {
  const { isLoading, result, error, sendRequest } = useHttp(getUser, true);

  useEffect(() => {
    sendRequest(props.userId);
  }, [sendRequest]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Sth is wrong...</p>;
  }
  return (
    <div>
      <header>
        {props.title} {props.completed ? "Completed" : "Not completed"}
      </header>
      <div>
        <p>
          Created by: <span>{result.name}</span>
        </p>
      </div>
      <footer>
        <button>Change state</button>
        <button>Edit</button>
        <button>Delete</button>
      </footer>
    </div>
  );
};
