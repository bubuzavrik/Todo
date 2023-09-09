import { ReactNode, FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
  wrapperId: string;
}

export const Portal: FC<Props> = ({ children, wrapperId }) => {
  const [wrapper, setWrapper] = useState<Element | null>(null);

  useEffect(() => {
    const wrapper = document.getElementById(wrapperId) as Element | null;
    
    setWrapper(wrapper);
  }, [wrapperId]);

  if (!wrapper) return null;

  return createPortal(children, wrapper);
};
