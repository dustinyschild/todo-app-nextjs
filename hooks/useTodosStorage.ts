import { useEffect, useMemo, useState } from "react";
import StorageService from "../services/localStorageService";
import { isBrowser } from "../utils";

export type TodoItem = {
  name: string;
  description: string;
  completed: boolean;
};

type TodoItemActions<S> = {
  addItem: (item: S) => void;
  completeItem: (id: number) => void;
  deleteItem: (id: number) => void;
};

const myTodosService = new StorageService<TodoItem[]>("my_todos");

const useTodosStorage = (): [TodoItem[], TodoItemActions<TodoItem>] => {
  const [items, setItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    if (isBrowser()) {
      setItems(myTodosService.getData());
    }
  }, [setItems]);

  useEffect(() => {
    if (isBrowser() && items.length) {
      myTodosService.setData(items);
    }
  }, [items]);

  const actions: TodoItemActions<TodoItem> = {
    addItem: (newItem: TodoItem) => {
      setItems([...items, newItem]);
    },
    completeItem: (id: number) => {
      const updatedItems = items.map((item, idx) => ({
        ...item,
        completed: id === idx
      }));

      setItems(updatedItems);
    },
    deleteItem: (id: number) => {
      const updatedItems = items.filter((item, idx) => id !== idx);

      setItems(updatedItems);
    }
  };

  return [items, actions];
};

export default useTodosStorage;
