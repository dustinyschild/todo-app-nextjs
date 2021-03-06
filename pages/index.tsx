import Head from "next/head";
import styles from "../styles/Home.module.css";
import MyTodos from "../components/MyTodos";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Todos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <MyTodos />
      </main>
    </div>
  );
}
