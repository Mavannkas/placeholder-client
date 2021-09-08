import { useState } from "react";
import { deleteTodo } from "../../lib/api";
import { TodoItem } from "./TodoItem";

export const TodoList = (props) => {
  const [todoList, setTodoList] = useState(props.todos);
  const deleteHandler = async (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });

    await deleteTodo(id);
  };

  return (
    <ol>
      {todoList.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          userId={item.userId}
          title={item.title}
          completed={item.completed}
          onDelete={deleteHandler}
        />
      ))}
    </ol>
  );
};
