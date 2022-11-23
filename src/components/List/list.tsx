import React from "react";

type Props = {
  title?: string;
};

const List = ({ title, children }: React.PropsWithChildren<Props>) => (
  <div>
    {title && <p className="text-indigo-500 text-sm uppercase mb-3">{title}</p>}
    {children}
  </div>
);

export { List };
