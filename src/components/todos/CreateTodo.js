import { useEffect, useState } from "react";
import { Button } from "../UI/Button";
import { Card } from "../UI/Card";
import { Modal } from "../UI/Modal";
import classes from "./CreateTodo.module.scss";
export const CreateTodo = (props) => {
  const [isShow, setIsShow] = useState(false);
  const [isCloseForm, setIsCloseForm] = useState(false);
  const [enteredUserId, setEnteredUserId] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(false);
    if (
      enteredUserId.trim() &&
      isFinite(enteredUserId) &&
      +enteredUserId > 0 &&
      +enteredUserId <= 10 &&
      enteredTitle.trim()
    ) {
      setIsFormValid(true);
    }
  }, [enteredUserId, enteredTitle]);

  const closeModalHandler = () => {
    setIsCloseForm(false);
  };

  const closeFormHandler = () => {
    setIsShow(false);
    setIsCloseForm(false);
  };

  const showHandler = () => {
    setIsShow(true);
  };

  const closeHandler = () => {
    setIsCloseForm(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onCreateNewTodo({
      userId: +enteredUserId,
      title: enteredTitle,
      completed: false,
    });
    setEnteredTitle("");
    setEnteredUserId("");
  };

  const userIdChangeHandler = (event) => {
    setEnteredUserId(event.target.value);
  };
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  return (
    <Card className={classes.centered}>
      {isCloseForm && (
        <Modal
          onClose={closeModalHandler}
          onAllow={closeFormHandler}
          message="Are you sure you want to delete?"
          title="Attention"
        />
      )}
      {!isShow && (
        <div className={classes.buttons}>
          <Button onClick={showHandler}>Create todos</Button>
        </div>
      )}
      {isShow && (
        <form className={classes.form} onSubmit={submitHandler}>
          <div>
            <label htmlFor="id">userId</label>
            <input
              type="number"
              id="id"
              onChange={userIdChangeHandler}
              value={enteredUserId}
              step="1"
              min="1"
              max="10"
              required
            ></input>
          </div>
          <div>
            <label htmlFor="title">title</label>
            <input
              type="text"
              id="title"
              onChange={titleChangeHandler}
              value={enteredTitle}
              required
            ></input>
          </div>
          <div className={classes.buttons}>
            <Button type="submit" disabled={!isFormValid ? "disabled" : ""}>
              Save
            </Button>
            <Button type="button" className="red" onClick={closeHandler}>
              Close
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
};
