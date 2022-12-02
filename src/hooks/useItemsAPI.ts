import React from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "context/auth";
import { db } from "../../firebase";

export type Item = {
  text: string;
  date: number;
  checked: boolean;
};

type Hook = {
  addItem: (_: Item[]) => ReturnType<typeof setDoc>;
  removeItem: (_: Item[]) => ReturnType<typeof setDoc>;
  editItem: (_: Item[]) => ReturnType<typeof setDoc>;
  fetchItems: () => Promise<Item[]>;
};

const useItemsAPI = () => {
  const { currentUser } = useAuth();

  const addItem: Hook["addItem"] = React.useCallback(async (items) => {
    // @ts-expect-error Formally 'currentUser' is possibly 'null'.ts(18047)
    const userRef = doc(db, "users", currentUser.uid);
    return setDoc(userRef, {
      todos: items,
    }, { merge: true });
  }, [currentUser]);

  const removeItem: Hook["removeItem"] = React.useCallback(async (items) => {
    // @ts-expect-error Formally 'currentUser' is possibly 'null'.ts(18047)
    const userRef = doc(db, "users", currentUser.uid);
    return setDoc(userRef, {
      todos: items,
    }, { merge: true });
  }, [currentUser]);

  const editItem: Hook["editItem"] = React.useCallback(async (items) => {
    // @ts-expect-error Formally 'currentUser' is possibly 'null'.ts(18047)
    const userRef = doc(db, "users", currentUser.uid);
    return setDoc(userRef, {
      todos: items,
    }, { merge: true });
  }, [currentUser]);

  const fetchItems: Hook["fetchItems"] = React.useCallback(async () => {
    // @ts-expect-error Formally 'currentUser' is possibly 'null'.ts(18047)
    const userRef = doc(db, "users", currentUser.uid);
    try {
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        return Promise.resolve(userSnapshot.data().todos);
      }
      return Promise.resolve([]);
    } catch (err) {
      return Promise.reject(new Error("Failed to load data"));
    }
  }, [currentUser]);

  return {
    addItem,
    removeItem,
    editItem,
    fetchItems,
  };
};

export type { Item as ItemType };

export { useItemsAPI };
