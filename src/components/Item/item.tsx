import clsx from "clsx";
import React, { ReactNode, useRef, useState } from "react";
import { ArrowRightCircleIcon, CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

type PropsWithClassName<P = unknown> = P & { className?: string | undefined };

type Props = {
  checked?: boolean;
  text: string;
  editing?: boolean
  newText?: string;
  handleNewTextChange: (_) => void;
  handleCheck: () => void;
  handleFinishEditing: (_) => void;
  handleStartEditing: () => void;
  handleRemove: () => void;
};

const renderIcon = (checked: Props["checked"]) => (
  <>
    {checked ? (
      <CheckCircleIcon className="w-6 h-6 grow-0 text-indigo-200" />
    ) : (
      <ArrowRightCircleIcon className="w-6 h-6 grow-0" />
    )}
  </>
);
const Item = ({
  checked,
  text,
  className,
  editing=false,
  handleCheck,
  handleFinishEditing,
  handleStartEditing,
  newText,
  handleNewTextChange,
  handleRemove,
}: PropsWithClassName<Props>) => {
  const styles = {
    container: clsx("p-5 bg-white rounded-lg","flex justify-between", className),
    content: clsx("flex gap-5 grow", "cursor-pointer"),
    text: checked ? "line-through text-indigo-200" : undefined,
    editingInput:`h-full w-full outline-0`, 
    actionsContainer:`flex gap-5 grow-0`,
    action: `cursor-pointer`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.content} onClick={handleCheck}>
        {renderIcon(checked)}
        {
        editing 
          ? <input 
              type="text"
              value={newText}
              onChange={event => handleNewTextChange(event.target.value)} 
              tabIndex={1} 
              autoFocus
              className={styles.editingInput}
            />
          : <p className={styles.text}>{text}</p>
          }
      </div>
      <div className={styles.actionsContainer}>
        {editing 
          ? <button onClick={handleFinishEditing} className={styles.action}>
            <CheckIcon className="w-6 h-6 grow-0" />
          </button>
          : <button onClick={handleStartEditing} className={styles.action}>
          <PencilIcon className="w-6 h-6 grow-0" />
        </button>
        }
        <button onClick={handleRemove}>
          <TrashIcon className="w-6 h-6 grow-0" />
        </button>
      </div>
    </div>
  );
};

export { Item };
