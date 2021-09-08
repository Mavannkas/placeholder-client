import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { getUser } from "../../lib/api";
import { Modal } from "../UI/Modal";

export const TodoItem = (props) => {
  const { isLoading, result, error, sendRequest } = useHttp(getUser, true);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    sendRequest(props.userId);
  }, [sendRequest, props.userId]);

  const deleteHandler = () => {
    console.log("XD");
    setIsDelete(true);
  };

  const deleteItemHandler = () => {
    props.onDelete(props.id);
  };

  const closeModalHandler = () => {
    setIsDelete(false);
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
        <button onClick={deleteHandler}>Delete</button>
      </footer>
    </div>
  );
};
