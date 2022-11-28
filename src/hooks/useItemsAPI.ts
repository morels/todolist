import React from "react";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export type Item = {
  text: string;
  date: number;
  checked: boolean;
};

type Hook = {
  addItem: (_: Item[]) => void;
  removeItem: (_: Item[]) => void;
  editItem: (_: Item[]) => void;
  fetchItems: () => Promise<Item[]>;
};

const useItemsAPI = () => {
  const currentUser = process.env.NEXT_PUBLIC_FIREBASE_USER_UID;
  
  if(!currentUser && process.env.NODE_ENV === 'development') {
    throw("You must set user UID first");
  }
  
  const addItem: Hook["addItem"] = React.useCallback(async (items) => {
    // @ts-expect-error
    // Expect missing signature for doc method as currentUser formally can be undefined
    const userRef = doc(db, 'users', currentUser);
    return setDoc(userRef, {
      'todos': items
    }, { merge: true })
  }, [currentUser]);
  
  const removeItem: Hook["removeItem"] = React.useCallback(async (items) => {
    // @ts-expect-error
    // Expect missing signature for doc method as currentUser formally can be undefined
    const userRef = doc(db, 'users', currentUser);
    return setDoc(userRef, {
      'todos': items
    }, { merge: true })
  }, [currentUser]);
  
  const editItem: Hook["editItem"] = React.useCallback(async(items) => {
    // @ts-expect-error
    // Expect missing signature for doc method as currentUser formally can be undefined
    const userRef = doc(db, 'users', currentUser);
    return setDoc(userRef, {
      'todos': items
    }, { merge: true })
  }, [currentUser]);

  const fetchItems: Hook['fetchItems'] = React.useCallback(async () => {
    // @ts-expect-error
    // Expect missing signature for doc method as currentUser formally can be undefined
    const userRef = doc(db, 'users', currentUser);
    try {
      const userSnapshot = await getDoc(userRef)
      if (userSnapshot.exists()) {
        return Promise.resolve(userSnapshot.data().todos);
      } else {
        return Promise.reject('Does not exist');
      }
    } catch (err) {
      return Promise.reject();
    }
  },[currentUser]);
  
  return {
    addItem,
    removeItem,
    editItem,
    fetchItems,
  };
};

export type {Item as ItemType};

export { useItemsAPI };
