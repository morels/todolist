import React from "react";

type Modal = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const ModalContext = React.createContext<Modal | null>(null);

const ModalProvider = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ open, close, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => React.useContext(ModalContext)!;

export { ModalProvider, useModal };
