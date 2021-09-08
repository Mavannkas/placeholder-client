import { createRef, useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { getUser } from "../../lib/api";
import { Modal } from "../UI/Modal";
import { TodoList } from "./TodoList";

export const TodoItem = (props) => {
  const { isLoading, result, error, sendRequest } = useHttp(getUser, true);
  const [isDelete, setIsDelete] = useState(false);
  const [completedState, setCompletedState] = useState(props.completed);
  const [enteredTitle, setEnteredTitle] = useState(props.title);
  const [editable, setEditable] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const textRef = createRef();

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

  const editShowHandler = () => {
    setEditable(true);
  };

  const closeEditHandler = () => {
    setEditable(false);
  };

  const changeEditHandler = () => {
    setTitleError(false);
  };

  const saveEditHandler = () => {
    if (textRef.current.value.trim() !== "") {
      props.onEdit(props.id, textRef.current.value);
      closeEditHandler();
      setEnteredTitle(textRef.current.value);
      return;
    }

    setTitleError(true);
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
        {!editable && <div>{enteredTitle}</div>}
        {editable && (
          <textarea
            defaultValue={enteredTitle}
            ref={textRef}
            onChange={changeEditHandler}
            style={{ background: titleError ? "red" : "" }}
          ></textarea>
        )}
      </header>
      <div>
        <p>
          Created by: <span>{result.name}</span>{" "}
          {completedState ? "Completed" : "Not completed"}
        </p>
      </div>
      <footer>
        {!editable && (
          <>
            <button onClick={toggleStateHandler}>Change state</button>
            <button onClick={editShowHandler}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </>
        )}
        {editable && (
          <>
            <button onClick={saveEditHandler}>Save</button>
            <button onClick={closeEditHandler}>Close</button>
          </>
        )}
      </footer>
    </div>
  );
};
