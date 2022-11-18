import Head from "next/head";
import { Item } from "../src/components/Item";
import { Title } from "../src/components/Title";
import styles from "../styles/Home.module.css";

const items = [
  { text: "Checked item", date: 1668792279974, checked: true },
  { text: "Checked item", date: 1668792297706, checked: true },
  { text: "Unchecked item", date: 1668792298706, checked: false },
  { text: "Unchecked item", date: 1668792299706, checked: false },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>TODO List</title>
        <meta name="description" content="Manage your todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Title>TODO List</Title>
        {items.map(({ text, checked }, i) => (
          <Item key={`${i}${text}`} checked={checked}>
            {text}
          </Item>
        ))}
      </main>

      <footer className={styles.footer}>&copy; Luca Morelli</footer>
    </div>
  );
}
