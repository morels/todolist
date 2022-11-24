import clsx from "clsx";
import React from "react";

type ButtonKind = "primary" | "secondary";
type Size = "regular" | "large";

type Props = {
  kind?: ButtonKind;
  size?: Size;
} & React.ButtonHTMLAttributes<HTMLElement>;

const style = {
  primary: {
    border: "border-2 border-blue-600 hover:border-blue-700 focus:border-blue-700 active:border-blue-800",
    background:
      "bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800",
    text: "text-white",
  },
  secondary: {
    border: "border-2 border-slate-100 hover:border-slate-100 focus:border-slate-100 active:border-slate-200",
    background:
      "bg-white hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-200",
    text: "text-inherit",
  },
  large: "p-5",
  regular: "p-2",
};

const Button = ({
  onClick,
  kind = "primary",
  size = "regular",
  children,
  ...attributes
}: React.PropsWithChildren<Props>) => (
  <a
    className={clsx(
      `${style[size]} w-full`,
      `rounded-lg ${style[kind].background} ${style[kind].border}`,
      "flex justify-center",
      `${style[kind].text}`,
      "cursor-pointer"
    )}
    onClick={onClick}
    {...attributes}
  >
    {typeof children === "string" ? <p>{children}</p> : children}
  </a>
);

export { Button };
