import { useEffect, useState } from "react";
import styles from "../../styles/MyTodos.module.css";

const MyTodos = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log({ name, description });
  }, [name, description]);

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
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default MyTodos;
