import { useAuth } from "@clerk/nextjs";
import { useCallback, useState } from "react";
import { Todo } from "../pages/api/todo";

export const useTodos = () => {
  const { userId } = useAuth();
  const [todos, setTodos] = useState<Todo[]>();

  const getTodos = useCallback(async () => {
    const res = await fetch(`/api/todos?userId=${userId}`);

    const data = await res.json();

    setTodos(data);
  }, [userId]);

  const createTodo = async ({ title, description }: Partial<Todo>) => {
    const res = await fetch(`/api/todo`, {
      method: "POST",
      body: JSON.stringify({ userId, title, description, isCompleted: false })
    });

    await getTodos();
  };

  const completeTodo = async (todo: Todo) => {
    const res = await fetch(`/api/todo?id=${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...todo, isCompleted: !todo.isCompleted })
    });

    await getTodos();
  };

  const deleteTodo = async ({ id }: Todo) => {
    const res = await fetch(`/api/todo?id=${id}`, {
      method: "DELETE"
    });

    await getTodos();
  };

  return {
    todos,
    getTodos,
    createTodo,
    completeTodo,
    deleteTodo
  };
};
