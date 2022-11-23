import clsx from "clsx";
import React from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

type PropsWithClassName<P = unknown> = P & { className?: string | undefined };

type Props = {
  checked?: boolean;
  text: string;
};

const Item = ({ checked, text, className }: PropsWithClassName<Props>) => (
  <div className={clsx("p-5 bg-white rounded-lg flex gap-5 ", className)}>
    <ArrowRightCircleIcon className="w-6 h-6 grow-0" />
    <p className={checked ? "line-through" : ""}>{text}</p>
  </div>
);

export { Item };
