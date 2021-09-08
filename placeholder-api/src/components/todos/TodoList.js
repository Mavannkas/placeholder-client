import { TodoItem } from "./TodoItem";

export const TodoList = (props) => {
  return (
    <ol>
      {props.todos.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          userId={item.userId}
          title={item.title}
          completed={item.completed}
        />
      ))}
    </ol>
  );
};
