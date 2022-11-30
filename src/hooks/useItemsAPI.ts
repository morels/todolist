import React from "react";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from "../context/auth";

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
  const { currentUser } = useAuth();
  
  const addItem: Hook["addItem"] = React.useCallback(async (items) => {
    // @ts-expect-error
    // Expect missing signature for doc method as currentUser formally can be undefined
    const userRef = doc(db, 'users', currentUser.uid);    
    return setDoc(userRef, {
      'todos': items
    }, { merge: true })
  }, [currentUser]);
  
  const removeItem: Hook["removeItem"] = React.useCallback(async (items) => {
    // @ts-expect-error
    // Expect missing signature for doc method as currentUser formally can be undefined
    const userRef = doc(db, 'users', currentUser.uid);
    return setDoc(userRef, {
      'todos': items
    }, { merge: true })
  }, [currentUser]);
  
  const editItem: Hook["editItem"] = React.useCallback(async(items) => {
    // @ts-expect-error
    // Expect missing signature for doc method as currentUser formally can be undefined
    const userRef = doc(db, 'users', currentUser.uid);
    return setDoc(userRef, {
      'todos': items
    }, { merge: true })
  }, [currentUser]);

  const fetchItems: Hook['fetchItems'] = React.useCallback(async () => {
    // @ts-expect-error
    // Expect missing signature for doc method as currentUser formally can be undefined
    const userRef = doc(db, 'users', currentUser.uid);
    try {
      const userSnapshot = await getDoc(userRef)
      if (userSnapshot.exists()) {
        return Promise.resolve(userSnapshot.data().todos);
      } else {
        return Promise.resolve([]);
      }
    } catch (err) {
      return Promise.reject("Failed to load data");
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
