import { createPortal } from "react-dom";

const BackDrop = (props) => {
  return <div onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div>
      <header>{props.title}</header>
      <div>{props.message}</div>
      <footer>
        <button onClick={props.onAllow}>Ok</button>
        <button onClick={props.onClose}>Cancel</button>
      </footer>
    </div>
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
