import clsx from "clsx";
import React from "react";

const Title = ({ children }: React.PropsWithChildren) => (
  <h1 className={clsx("m-0 mb-12 leading-normal text-6xl font-bold")}>{children}</h1>
);

export { Title };
