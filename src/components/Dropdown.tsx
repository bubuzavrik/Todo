import { FC, useState, ReactNode, useRef } from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "../hooks/useClickOutside";

interface Props {
  target: ReactNode;
  children: ReactNode;
}

export const Dropdown: FC<Props> = ({ target, children }) => {
  const ref = useRef(null);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  useClickOutside(ref, () => isMenuOpened && setIsMenuOpened(false));

  const toggleMenu = () => setIsMenuOpened(!isMenuOpened);

  return (
    <motion.div ref={ref} className="relative" onClick={toggleMenu}>
      <span className="cursor-default">{target}</span>
      <motion.div
        className="absolute z-10 top-full mt-2 right-0 p-4 bg-white border border-color-primary"
        initial="exit"
        animate={isMenuOpened ? "enter" : "exit"}
        variants={{
          enter: {
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            transition: {
              duration: 0.3,
            },
            display: "block",
          },
          exit: {
            opacity: 0,
            rotateX: 30,
            rotateY: -50,
            transition: {
              duration: 0.3,
              delay: 0.2,
            },
            transitionEnd: {
              display: "none",
            },
          },
        }}
      >
        <div className="absolute drop-shadow-md t-0 l-0 bg-white" />
        <div className="flex flex-col gap-y-2">{children}</div>
      </motion.div>
    </motion.div>
  );
};
