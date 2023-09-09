import React, { FC, ReactNode } from "react";

interface Props {
  name: String;
  children: ReactNode;
}
export const List: FC<Props> = ({ children, name }) => {
  const count = React.Children.count(children);

  return (
    <div className="flex-col p-4">
      <div className="flex flex-row justify-between items-center">
        <h2 className="font-bold text-2xl">{name}</h2>
        <div className="flex items-center justify-center rounded-full bg-secondary w-6 h-6">{count}</div>
      </div>
      <hr className="my-4 w-full" />
      <div className="w-full grid grid-flow-row gap-y-4 tablet:w-80">{children}</div>
    </div>
  );
};
