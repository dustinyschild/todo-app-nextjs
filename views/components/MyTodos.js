import { useEffect, useRef, useState } from "react";
import styles from "../../styles/MyTodos.module.css";

const MyTodos = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const addItem = (e) => {
    e.preventDefault();

    const items = JSON.parse(localStorage.getItem("myTodos")) || [];

    items.push({ name, description, completed: false });

    localStorage.setItem("myTodos", JSON.stringify(items));
    console.log(items);

    setName("");
    setDescription("");
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
        <div className={styles.todoItemContainer}>
          <div className={styles.todoItem}>
            <dt>Todo Title</dt>
            <dd>Todo description</dd>
          </div>
          <div className={styles.todoItemButtonGroup}>
            <button className={styles.complete}>Complete</button>
            <button className={styles.delete}>Delete</button>
          </div>
        </div>

        <div className={styles.todoItemContainer}>
          <div className={styles.todoItem}>
            <dt>Todo Title</dt>
            <dd>Todo description</dd>
          </div>
          <div className={styles.todoItemButtonGroup}>
            <button className={styles.complete}>Complete</button>
            <button className={styles.delete}>Delete</button>
          </div>
        </div>
      </dl>
    </div>
  );
};

export default MyTodos;
