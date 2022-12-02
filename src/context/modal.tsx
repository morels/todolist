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

  const value = React.useMemo(() => ({ open, close, isOpen }), [isOpen]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const useModal = () => React.useContext(ModalContext)!;

export { ModalProvider, useModal };
