import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactNode, useRef } from "react";

import { Card } from "./Card";
import { useClickOutside } from "../hooks/useClickOutside";

interface Props {
  isOpen: Boolean;
  handleClose: Function;
  children: ReactNode;
}

export const Modal: FC<Props> = ({ isOpen, handleClose, children }) => {
  const cardRef = useRef(null);
  useClickOutside(cardRef, handleClose);

  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            ease: "linear",
            duration: 0.5,
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            ease: "linear",
            duration: 0.5,
          },
        }}
        className="fixed z-10 bg-overlay top-0 left-0 w-screen h-screen flex items-center justify-center"
      >
        <Card
          ref={cardRef}
          classNames="bg-white flex flex-col relative z-20 px-0 py-0 w-full h-full top-0 left-0 tablet:w-auto tablet:h-auto"
        >
          {children}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
