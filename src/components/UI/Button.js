import classes from "./Button.module.scss";

export const Button = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`${classes.button} ${props.className ?? ""}`}
      disabled={props.disabled ?? ""}
    >
      {props.children}
    </button>
  );
};
