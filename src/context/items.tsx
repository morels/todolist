import React from "react";
import { Item, useItemsAPI } from "../hooks/useItemsAPI";

type Context = {
  items: Item[];
  addItem: (_: Partial<Item>) => void;
  removeItem: (position: number) => void;
  editItem: (item: Partial<Pick<Item, "text" | "checked">>, position: number) => void;
  fetchItems: () => Promise<void>;
  error: string | null;
  loading: boolean;
};

const ItemContext = React.createContext<Context | null>(null);

const ItemsProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string|null>(null);

  const {
    addItem: addItemAPI,
    removeItem: removeItemAPI,
    editItem: editItemAPI,
    fetchItems: fetchItemsAPI,
  } = useItemsAPI();

  const addItem: Context["addItem"] = React.useCallback(async ({
    text = "",
    date = new Date().getTime(),
    checked = false,
  }: Partial<Item>) => {
    setLoading(true);
    try {
      await addItemAPI([...items, { text, date, checked }]);
      setItems((oldItems) => [...oldItems, { text, date, checked }]);
    } catch (err) {
      setError("Unable to add");
    } finally {
      setLoading(false);
    }
  }, [addItemAPI, items]);

  const removeItem: Context["removeItem"] = React.useCallback(async (position) => {
    const newItems = [...items];
    newItems.splice(position, 1);

    setLoading(true);
    try {
      await removeItemAPI(newItems);
      setItems(newItems);
    } catch (err) {
      setError("Unable to remove");
    } finally {
      setLoading(false);
    }
  }, [items, removeItemAPI]);

  const editItem: Context["editItem"] = React.useCallback(async ({ text, checked }, position) => {
    const newItem = { ...items[position] };
    newItem.text = text ?? newItem.text;
    newItem.checked = checked ?? newItem.checked;
    const newItems = Object.values<Item>({ ...items, [position]: newItem });
    setLoading(true);
    try {
      await editItemAPI(newItems);
      setItems(newItems);
    } catch (err) {
      setError("Unable to edit");
    } finally {
      setLoading(false);
    }
  }, [editItemAPI, items]);

  const fetchItems: Context["fetchItems"] = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchItemsAPI();
      setItems(data);
    } catch (err) {
      setItems([]);
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  }, [fetchItemsAPI]);

  const value = React.useMemo<Context>(() => ({
    addItem,
    removeItem,
    editItem,
    items,
    fetchItems,
    error,
    loading,
  }), [addItem, editItem, error, fetchItems, items, loading, removeItem]);

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const useItemsContext = () => React.useContext(ItemContext)!;

export type { Item as ItemType };

export { ItemsProvider, useItemsContext };
