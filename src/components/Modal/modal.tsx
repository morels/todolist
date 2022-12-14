import React, { useEffect, useRef } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import FocusLock from "react-focus-lock";
import clsx from "clsx";
import { Button } from "../Button";

type Modal = {
  visible?: boolean;
  onClose: () => void;
  onAction: () => void;
} & React.HTMLAttributes<HTMLElement>;

const Modal = ({
  visible = false,
  onClose,
  onAction,
  id,
  children,
}: React.PropsWithChildren<Modal>) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollRef = scrollerRef.current;
    if (scrollRef !== null) {
      disableBodyScroll(scrollRef);
    }

    return () => {
      if (scrollRef !== null) {
        enableBodyScroll(scrollRef);
      }
    };
  }, [visible]);

  return visible ? (
    <div
      className={clsx(
        "fixed bottom-0 left-0 top-0 right-0",
        "flex flex-col items-center justify-center",
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={id}
      id={id}
      ref={modalRef}
    >
      <div className="absolute bottom-0 left-0 top-0 right-0 bg-white opacity-50" />
      <div className="bg-white rounded-lg p-10 relative w-full max-w-2xl border">
        <FocusLock ref={scrollerRef} returnFocus={{ preventScroll: false }}>
          {children}
          <div className="flex gap-5 md:w-1/2 md:ml-auto">
            <Button
              onClick={onClose}
              key="close"
              aria-label="Close modal"
              kind="secondary"
            >
              Close
            </Button>
            <Button onClick={onAction}>OK</Button>
          </div>
        </FocusLock>
      </div>
    </div>
  ) : null;
};

export { Modal };
