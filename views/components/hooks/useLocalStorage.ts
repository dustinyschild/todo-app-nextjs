import { useEffect, useMemo, useState } from "react";

type LocalStorage<T> = {
  addItem: (item: T) => void
  completeItem: (id: number) => void
  deleteItem: (id: number) => void
}

type TodoItem = {
  name: string
  description: string
  completed: boolean
}


const useLocalStorage = (storageName: string):
  [TodoItem[], LocalStorage<TodoItem>] => {
  const [items, setItems] = useState<TodoItem[]>([]);

  // load items into state
  useEffect(() => {
    const storageItems: TodoItem[] = JSON.parse(localStorage.getItem(storageName)) || [];

    setItems(storageItems);
  }, [storageName, setItems]);

  const actions = {
    addItem: (item: TodoItem) => {
      const newItems = [...items, item];

      setItems(newItems);
      localStorage.setItem(storageName, JSON.stringify(newItems));
    },
    completeItem: (id: number) => {
      const updatedItems = items.map((item: TodoItem, idx) => ({...item, completed: idx === id}));

      setItems(updatedItems);
      localStorage.setItem(storageName, JSON.stringify(updatedItems));
    },
    deleteItem: (id: number) => {
      const filteredList = items.filter((item, idx) => idx !== id);
      setItems(filteredList);
      localStorage.setItem(storageName, JSON.stringify(filteredList));
    },
  };

  return [items, actions];
};

export default useLocalStorage;