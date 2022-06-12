import { useEffect, useMemo, useState } from "react";

type TodoItem = {
  name: string
  description: string
  completed: boolean
}


const useLocalStorage = (storageName: string) => {
  const [items, setItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    const storageItems: TodoItem[] = JSON.parse(localStorage.getItem(storageName)) || [];

    setItems(storageItems);
  }, [storageName, setItems]);

  const actions = {
    addItem: (item: TodoItem) => {
      items.push(item);

      setItems(items)
      localStorage.setItem(storageName, JSON.stringify(items));
    },
    completeItem: (id: number) => {
      const updatedItems = items.map((item, idx) => {
        if (idx === id) {
          const newItem = {...item, completed: true}
          return newItem;
        }

        return item;
      });

      setItems(updatedItems)
      localStorage.setItem(storageName, JSON.stringify(updatedItems))
    },
    deleteItem: (id: number) => {
      const filteredList = items.filter((item, idx) => idx !== id)
      setItems(filteredList);
      localStorage.setItem(storageName, JSON.stringify(filteredList))
    },
  };

  console.log(items);

  return [items, actions];
};

export default useLocalStorage;