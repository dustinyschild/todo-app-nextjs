import { useEffect, useRef, useState } from "react";
import styles from "../styles/MyTodos.module.css";
import useTodosStorage from "../hooks/useTodosStorage";

const MyTodos = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [items, storage] = useTodosStorage();

  const addItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    storage.addItem({ name, description, completed: false });

    setName("");
    setDescription("");
  };

  const completeItem = (id: number) => () => {
    storage.completeItem(id);
  };

  const deleteItem = (id: number) => () => {
    storage.deleteItem(id);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.headerText}>My Todos</h1>
      <form className={styles.form} onSubmit={addItem}>
        <div className={styles.inputGroup}>
          <div className={styles.inputContainer}>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="description">Description</label>
            <input
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit">Add Todo</button>
        </div>
      </form>
      <dl className={styles.todoList}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`${styles.todoItemContainer} ${
              item.completed ? styles.completed : ""
            }`}
          >
            <div className={styles.todoItem}>
              <dt>{item.name}</dt>
              <dd>{item.description}</dd>
            </div>
            <div className={styles.todoItemButtonGroup}>
              <button
                onClick={completeItem(idx)}
                className={`${styles.complete} ${
                  item.completed ? styles.completed : ""
                }`}
              >
                Complete
              </button>
              <button onClick={deleteItem(idx)} className={styles.delete}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default MyTodos;
