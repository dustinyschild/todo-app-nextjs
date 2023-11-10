import { useAuth } from "@clerk/nextjs";
import { useCallback, useState } from "react";
import { Todo } from "../pages/api/todo";

export const useTodos = () => {
  const { userId } = useAuth();
  const [todos, setTodos] = useState<Todo[]>();

  const getTodos = useCallback(async () => {
    const res = await fetch(`/api/todos?userId=${userId}`);

    // handle errors

    return setTodos(await res.json());
  }, [userId]);

  const createTodo = async ({ title, description }: Partial<Todo>) => {
    const res = await fetch(`/api/todo`, {
      method: "POST",
      body: JSON.stringify({ userId, title, description })
    });

    // handle errors

    await getTodos();
  };

  const markComplete = async (todo: Todo) => {
    const res = await fetch(`/api/todo?id=${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...todo, isCompleted: false })
    });

    // handle errors

    await getTodos();
  };

  const deleteTodo = async (todo: Todo) => {
    const res = await fetch(`/api/todo/${todo.id}`, {
      method: "DELETE"
    });

    // handle errors

    await getTodos();
  };

  return {
    todos,
    getTodos,
    createTodo,
    markComplete,
    deleteTodo
  };
};
