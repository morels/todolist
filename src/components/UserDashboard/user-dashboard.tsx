import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { Button } from "components/Button";
import { Item } from "components/Item";
import { List } from "components/List";
import { Modal } from "components/Modal";
import { useItemsContext } from "context/items";
import { useModal } from "context/modal";
import { Title } from "../Title";

const UserDashboard = () => {
  const {
    items, addItem, editItem, removeItem, fetchItems,
  } = useItemsContext();
  const { open: openModal, close: closeModal, isOpen } = useModal();
  const [newText, setNewText] = React.useState<string>("");
  const [isEditingAt, setIsEditingAt] = React.useState(-1);

  useEffect(() => {
    async function effect() {
      try {
        await fetchItems();
      } catch (err) {
        /* empty */
      }
    }
    effect();
  }, [fetchItems]);

  const handleAdd = () => {
    setIsEditingAt(-1);
    addItem({ text: newText });
    setNewText("");
    closeModal();
  };

  const handleNewTextChange = (text:string) => {
    setNewText(text);
  };

  const handleFinishEditing = (i:number) => () => {
    editItem({ text: newText }, i);
    setIsEditingAt(-1);
    setNewText("");
  };

  const handleCheck = (i:number) => () => {
    editItem({ checked: !items[i].checked }, i);
  };

  const handleStartEditing = (i:number) => () => {
    setNewText(items[i].text);
    setIsEditingAt(i);
  };

  const handleRemove = (i:number) => () => {
    removeItem(i);
    if (isEditingAt === i) {
      setIsEditingAt(-1);
      setNewText("");
    }
  };

  return (
    <div className="flex flex-col">
      <Title>Hey, what&apos;s up?</Title>
      <List title="tasks">
        {items.map(({ text, checked }, i) => (
          <Item
            // eslint-disable-next-line react/no-array-index-key
            key={`${i}-${text}`}
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
      {/* eslint-disable-next-line */}
      <Button tabIndex={1} onClick={openModal} size="large">
        <PlusIcon className="w-6 h-6 stroke-2" />
      </Button>
      <Modal onClose={closeModal} onAction={handleAdd} visible={isOpen}>
        <input
          className="w-full p-3 pl-0 mb-6 outline-0 text-xl"
          placeholder="Enter a new task"
          type="text"
          value={newText || ""}
          onChange={({ target: { value } }) => setNewText(value)}
        />
      </Modal>
    </div>
  );
};

export { UserDashboard };
