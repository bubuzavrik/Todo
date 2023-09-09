import { motion } from "framer-motion";
import { FC } from "react";

const sizes = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-16 h-16",
};

interface Props {
  size?: string;
}

export const Loader: FC<Props> = ({ size = "md" }) => {
  const _size = sizes[size as keyof typeof sizes];

  return (
    <div className={`relative flex my-0 mx-auto ${_size}`}>
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className={`${_size} border-4 border-background border-t-primary rounded-full justify-center items-center`}
      />
    </div>
  );
};
