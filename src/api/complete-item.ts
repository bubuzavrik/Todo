import { sleep } from "../services/sleep";
import { setItem, getItem } from "../services/ls";

export const completeItem = (id: string) => async () => {
  await sleep(2000);
  const list: Todo[] = getItem("list");

  const updatedList = list.map((el) => {
    const { id: _id } = el;

    return id === _id ? { ...el, completed: true } : el;
  });

  setItem("list", updatedList);
};
