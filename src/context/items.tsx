import React from "react";

 type Item = {
  text: string;
  date: number;
  checked: boolean;
};

type Context = {
  items: Item[];
  addItem: (_: Partial<Item>) => void;
  removeItem: (position: number) => void;
  editItem: (item: Partial<Pick<Item, "text" | "checked">>, position: number ) => void;
};

const ItemContext = React.createContext<Context | null>(null);

const ItemsProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [items, setItems] = React.useState<Item[]>([]);

  const addItem: Context["addItem"] = React.useCallback(({
    text = "",
    date = new Date().getTime(),
    checked = false,
  }: Partial<Item>) => {
    setItems(oldItems => {
      console.log('oldItems', oldItems); return [...oldItems, { text, date, checked }]});
  }, []);
  
  const removeItem: Context["removeItem"] = React.useCallback((position) => {
    const newItems = [...items];
    newItems.splice(position, 1);
    setItems(newItems);
  }, [items]);
  
  const editItem: Context["editItem"] = React.useCallback(({ text, checked }, position) => {
    const newItem = {...items[position]};
    newItem.text = text ?? newItem.text;
    newItem.checked = checked ?? newItem.checked;
    setItems(Object.values<Item>({ ...items, [position]: newItem }));
  }, [items]);

  const value = {
    addItem,
    removeItem,
    editItem,
    items: items
  };

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
};

const useItemsContext = () => React.useContext(ItemContext)!;

export type {Item as ItemType};

export { ItemsProvider, useItemsContext };
