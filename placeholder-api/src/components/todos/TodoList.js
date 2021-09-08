import { useState } from "react";
import { deleteTodo, updateTodo } from "../../lib/api";
import { TodoItem } from "./TodoItem";

export const TodoList = (props) => {
  const [todoList, setTodoList] = useState(props.todos);

  const deleteHandler = async (id) => {
    try {
      await deleteTodo(id);
    } catch (err) {
      alert(err);
    }

    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggleStateHandler = async (id, directState) => {
    try {
      await updateTodo(id, {
        completed: directState,
      });
    } catch (err) {
      alert(err);
    }

    setTodoList((prevTodos) => {
      const todoIndex = prevTodos.findIndex((todo) => todo.id === id);

      prevTodos[todoIndex].completed = directState;

      return prevTodos;
    });
  };

  const editHandler = async (id, directTitle) => {
    try {
      await updateTodo(id, {
        title: directTitle,
      });
    } catch (err) {
      alert(err);
    }

    setTodoList((prevTodos) => {
      const todoIndex = prevTodos.findIndex((todo) => todo.id === id);

      prevTodos[todoIndex].title = directTitle;

      return prevTodos;
    });
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
          onToggleState={toggleStateHandler}
          onEdit={editHandler}
        />
      ))}
    </ol>
  );
};
