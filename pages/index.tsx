import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Head from "next/head";
import React from "react";
import { useEffect } from "react";
import { Button } from "../src/components/Button";
import { Item } from "../src/components/Item";
import { List } from "../src/components/List";
import { Modal } from "../src/components/Modal";
import { Title } from "../src/components/Title";
import { useItemsContext } from "../src/context/items";
import { useModal } from "../src/context/modal";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { items, addItem } = useItemsContext();
  const { open: openModal, close: closeModal, isOpen } = useModal();
  const [newTitle, setNewTitle] = React.useState<string>();

  useEffect(() => {
    addItem({ text: "Checked item", date: 1668792279974, checked: true });
    addItem({ text: "Checked item", date: 1668792297706, checked: true });
    addItem({ text: "Unchecked item", date: 1668792298706 });
    addItem({ text: "Unchecked item" });
  }, []);

  const handleAction = () => {
    addItem({ text: newTitle });
    setNewTitle("");
    closeModal();
  };

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
        <Button tabIndex={1} onClick={openModal} size="large">
          <PlusIcon className="w-6 h-6 stroke-2" />
        </Button>
        <Modal onClose={closeModal} onAction={handleAction} visible={isOpen}>
          <input
            className="w-full p-3 pl-0 mb-6 outline-0 text-xl"
            placeholder="Enter a new task"
            type="text"
            value={newTitle ?? ""}
            onChange={({ target: { value } }) => setNewTitle(value)}
          />
        </Modal>
      </main>

      <footer className={styles.footer}>&copy; Luca Morelli</footer>
    </div>
  );
}
