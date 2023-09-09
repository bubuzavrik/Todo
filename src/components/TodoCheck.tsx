import { useContext, FC, MouseEvent } from "react";
import { SelectedTodosCtx } from "../App";

interface Props {
  id: String;
}

export const TodoCheck: FC<Props> = ({ id }) => {
  const { selected, changeSelection } = useContext(SelectedTodosCtx);

  const isChecked = selected.includes(id);

  const changeSelected = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    changeSelection(id);
  };

  return (
    <input
      onClick={changeSelected}
      type="checkbox"
      defaultChecked={isChecked}
    />
  );
};
