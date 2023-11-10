import { useEffect, useState } from "react";
import styles from "../styles/MyTodos.module.css";
import useTodosStorage from "../hooks/useTodosStorage";
import { useTodos } from "../hooks/useTodos.1";
import { Todo } from "../pages/api/todo";

const MyTodos = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [items, storage] = useTodosStorage();
  const { todos, getTodos, createTodo, completeTodo, deleteTodo } = useTodos();

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const addItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTodo({ title: name, description });

    setName("");
    setDescription("");
  };

  const completeItem = (todo: Todo) => () => {
    completeTodo(todo);
  };

  const deleteItem = (todo: Todo) => () => {
    deleteTodo(todo);
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
        {todos?.map((todo) => (
          <div
            key={todo.id}
            className={`${styles.todoItemContainer} ${
              todo.isCompleted ? styles.completed : ""
            }`}
          >
            <div className={styles.todoItem}>
              <dt>{todo.title}</dt>
              <dd>{todo.description}</dd>
            </div>
            <div className={styles.todoItemButtonGroup}>
              <button
                onClick={completeItem(todo)}
                className={`${styles.complete} ${
                  todo.isCompleted ? styles.completed : ""
                }`}
              >
                Complete
              </button>
              <button onClick={deleteItem(todo)} className={styles.delete}>
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
