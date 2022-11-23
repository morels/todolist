import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Head from "next/head";
import { useEffect } from "react";
import { Button } from "../src/components/button";
import { Item } from "../src/components/Item";
import { List } from "../src/components/List";
import { Title } from "../src/components/Title";
import { useItemsContext } from "../src/context/items";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { items, addItem } = useItemsContext();

  useEffect(() => {
    addItem({ text: "Checked item", date: 1668792279974, checked: true });
    addItem({ text: "Checked item", date: 1668792297706, checked: true });
    addItem({ text: "Unchecked item", date: 1668792298706 });
    addItem({ text: "Unchecked item" });
  }, []);

  return (
    <div className="bg-indigo-50 text-indigo-900">
      <Head>
        <title>TODO List</title>
        <meta name="description" content="Manage your todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={clsx(
          "py-16 px-0",
          "max-w-5xl m-auto",
          "min-h-screen",
          "flex flex-col"
        )}
      >
        <Title>Hey, what's up?</Title>
        <List title="tasks">
          {items.map(({ text, checked }, i, items) => (
            <Item
              key={`${i}${text}`}
              checked={checked}
              className={i < items.length ? "mb-3" : ""}
              text={text}
            />
          ))}
        </List>
        <Button tabIndex={1}>+</Button>
      </main>

      <footer className={styles.footer}>&copy; Luca Morelli</footer>
    </div>
  );
}
