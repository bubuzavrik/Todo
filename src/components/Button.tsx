import { FC, MouseEventHandler } from "react";
import { motion } from "framer-motion";

interface Props {
  onClick?: MouseEventHandler;
  children: String;
  classNames?: String;
  type?: String;
  isDisabled?: boolean;
}

const buttonType = {
  default: "bg-primary",
  submit: "bg-primary",
  accept: "bg-green-600",
  decline: "bg-red-700",
  disabled: "bg-slate-600",
};

export const Button: FC<Props> = ({
  type = "default",
  classNames = "",
  onClick,
  children,
  isDisabled = false,
}) => {
  const buttonColor = isDisabled
    ? buttonType.disabled
    : buttonType[type as keyof typeof buttonType];

  return (
    <motion.button
      disabled={isDisabled}
      whileTap={!isDisabled ? { scale: 0.9, opacity: 0.8 } : {}}
      onClick={onClick}
      className={`py-2 px-4 rounded-md text-white whitespace-nowrap ${buttonColor} ${
        isDisabled ? "" : "cursor-pointer"
      } ${classNames}`}
    >
      {children}
    </motion.button>
  );
};
