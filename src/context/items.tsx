import React from "react";

type Item = {
  text: string;
  date: number;
  checked: boolean;
};

const defaultItems: Item[] = [];

type Context = {
  items: Item[];
  addItem: (_: Partial<Item>) => void;
};

const ItemContext = React.createContext<Context | null>(null);

type Props = {
  items?: Item[];
};

const ItemsProvider = ({
  items: outerItems = defaultItems,
  children,
}: React.PropsWithChildren<Props>) => {
  const [myItems, setMyItems] = React.useState<Item[]>(outerItems);

  const addItem: Context["addItem"] = ({
    text = "",
    date = new Date().getTime(),
    checked = false,
  }: Partial<Item>) => {
    setMyItems((oldItems) => [...oldItems, { text, date, checked }]);
  };

  return (
    <ItemContext.Provider
      value={{
        items: myItems,
        addItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

const useItemsContext = () => React.useContext(ItemContext)!;

export { ItemsProvider, useItemsContext };
