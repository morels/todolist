import React from "react";

interface Props {
  checked?: boolean;
}

const Item: React.FC<React.PropsWithChildren<Props>> = ({
  checked,
  children,
}) => (
  <div>
    {"[]"}
    {checked && "---"}
    {children}
    {checked && "---"}
  </div>
);

export { Item };
