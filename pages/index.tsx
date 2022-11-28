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
  const { items, addItem, editItem, removeItem } = useItemsContext();
  const { open: openModal, close: closeModal, isOpen } = useModal();
  const [newText, setNewText] = React.useState<string>("");
  const [isEditingAt, setIsEditingAt] = React.useState(-1);

  useEffect(() => {
    addItem({ text: "Checked item", date: 1668792279974, checked: true });
    addItem({ text: "Checked item", date: 1668792297706, checked: true });
    addItem({ text: "Unchecked item", date: 1668792298706 });
    addItem({ text: "Unchecked item" });
  }, [addItem]);

  const handleAdd = () => {
    setIsEditingAt(-1);
    addItem({ text: newText });
    setNewText("");
    closeModal();
  };

  const handleNewTextChange = (text) => {
    setNewText(text);
  };

  const handleFinishEditing = (i) => () => {
    editItem({text: newText},i);
    setIsEditingAt(-1);
    setNewText("");
  };
  
  const handleCheck = (i) => () => {
    editItem({checked: !items[i].checked}, i);
  };
  
  const handleStartEditing = (i) => () => {
    setNewText(items[i].text);
    setIsEditingAt(i);
  }
  
  const handleRemove = (i) => () => {
    removeItem(i);
    if(isEditingAt === i){
      setIsEditingAt(-1);
      setNewText("");
    }
  }

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
        <Title>Hey, what&apos;s up?</Title>
        <List title="tasks">
          {items.map(({ text, checked }, i, items) => (
            <Item
              key={`${i}${text}`}
              className={i < items.length ? "mb-3" : ""}
              text={text}
              checked={checked}
              editing={isEditingAt === i}
              newText={newText}
              handleNewTextChange={handleNewTextChange}
              handleCheck={handleCheck(i)}
              handleStartEditing={handleStartEditing(i)}
              handleFinishEditing={handleFinishEditing(i)}
              handleRemove={handleRemove(i)}
            />
          ))}
        </List>
        <Button tabIndex={1} onClick={openModal} size="large">
          <PlusIcon className="w-6 h-6 stroke-2" />
        </Button>
        <Modal onClose={closeModal} onAction={handleAdd} visible={isOpen}>
          <input
            className="w-full p-3 pl-0 mb-6 outline-0 text-xl"
            placeholder="Enter a new task"
            type="text"
            value={newText ?? ""}
            onChange={({ target: { value } }) => setNewText(value)}
          />
        </Modal>
      </main>

      <footer className={styles.footer}>&copy; Luca Morelli</footer>
    </div>
  );
}
