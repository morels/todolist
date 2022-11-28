import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useEffect } from "react";
import { Button } from "../Button";
import { Item } from "../Item";
import { List } from "../List";
import { Modal } from "../Modal";
import { Title } from "../Title";
import { useItemsContext } from "../../context/items";
import { useModal } from "../../context/modal";

const UserDashobard = () => {
  const { items, addItem, editItem, removeItem, fetchItems } = useItemsContext();
  const { open: openModal, close: closeModal, isOpen } = useModal();
  const [newText, setNewText] = React.useState<string>("");
  const [isEditingAt, setIsEditingAt] = React.useState(-1);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

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
      <div className={"flex flex-col"} >
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
    </div>
  );
}

export {UserDashobard};
