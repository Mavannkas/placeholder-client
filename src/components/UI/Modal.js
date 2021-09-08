import { createPortal } from "react-dom";
import { Card } from "./Card";
import classes from "./Modal.module.scss";
import { Button } from "./Button";
const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.overlay}>
      <header>{props.title}</header>
      <div>{props.message}</div>
      <footer>
        <Button onClick={props.onAllow}>Ok</Button>
        <Button onClick={props.onClose} className="red">
          Cancel
        </Button>
      </footer>
    </Card>
  );
};

const root = document.getElementById("root-overlay");

export const Modal = (props) => {
  return (
    <>
      {createPortal(<BackDrop onClose={props.onClose} />, root)}
      {createPortal(
        <ModalOverlay
          onClose={props.onClose}
          onAllow={props.onAllow}
          message={props.message}
          title={props.title}
        />,
        root
      )}
    </>
  );
};
