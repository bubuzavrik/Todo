import { FC, MouseEventHandler, ReactNode, Ref, forwardRef } from "react";
import { motion } from "framer-motion";

interface Props {
  children?: ReactNode;
  classNames?: String;
  onClick?: MouseEventHandler;
  ref?: Ref<HTMLDivElement>;
}

export const Card: FC<Props> = forwardRef(
  ({ children, classNames = "", onClick = undefined }, ref) => {
    return (
      <motion.div
        ref={ref}
        onClick={onClick}
        className={`rounded-md bg-white drop-shadow-lg flex-column p-3 ${classNames}`}
      >
        {children}
      </motion.div>
    );
  }
);
