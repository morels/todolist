import clsx from "clsx";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLElement>;

const Button = ({ onClick, children, ...attributes }: React.PropsWithChildren<Props>) => (
  <a
    className={clsx(
      "p-5 w-100",
      "rounded-lg bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800",
      "cursor-pointer text-center text-white text-2xl"
    )}
    onClick={onClick}
    {...attributes}
  >
    {children}
  </a>
);

export { Button };
