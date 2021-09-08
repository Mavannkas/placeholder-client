import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { getUser } from "../../lib/api";
import { Modal } from "../UI/Modal";
import { TodoList } from "./TodoList";

export const TodoItem = (props) => {
  const { isLoading, result, error, sendRequest } = useHttp(getUser, true);
  const [isDelete, setIsDelete] = useState(false);
  const [completedState, setCompletedState] = useState(props.completed);

  useEffect(() => {
    sendRequest(props.userId);
  }, [sendRequest, props.userId]);

  const deleteHandler = () => {
    setIsDelete(true);
  };

  const deleteItemHandler = () => {
    props.onDelete(props.id);
  };

  const closeModalHandler = () => {
    setIsDelete(false);
  };

  const toggleStateHandler = () => {
    props.onToggleState(props.id, !completedState);

    setCompletedState((prevTodo) => !prevTodo);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Sth is wrong...</p>;
  }
  return (
    <div>
      {isDelete && (
        <Modal
          onClose={closeModalHandler}
          onAllow={deleteItemHandler}
          message="Are you sure you want to delete?"
          title="Attention"
        />
      )}
      <header>
        {props.title} {completedState ? "Completed" : "Not completed"}
      </header>
      <div>
        <p>
          Created by: <span>{result.name}</span>
        </p>
      </div>
      <footer>
        <button onClick={toggleStateHandler}>Change state</button>
        <button>Edit</button>
        <button onClick={deleteHandler}>Delete</button>
      </footer>
    </div>
  );
};
