import clsx from "clsx";
import React, { useState } from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

type PropsWithClassName<P = unknown> = P & { className?: string | undefined };

type Props = {
  checked?: boolean;
  text: string;
};

const renderIcon = (checked: Props["checked"]) => (
  <>
    {checked ? (
      <CheckCircleIcon className="w-6 h-6 grow-0" />
    ) : (
      <ArrowRightCircleIcon className="w-6 h-6 grow-0" />
    )}
  </>
);
const Item = ({
  checked: isChecked,
  text,
  className,
}: PropsWithClassName<Props>) => {
  const [checked, setChecked] = useState(isChecked);

  const handleClick = () => {
    setChecked((wasChecked) => !wasChecked);
  };

  return (
    <div
      className={clsx(
        "p-5 bg-white rounded-lg",
        "flex gap-5",
        checked ? "text-indigo-200" : "",
        "cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      {renderIcon(checked)}
      <p className={checked ? "line-through" : ""}>{text}</p>
    </div>
  );
};

export { Item };
