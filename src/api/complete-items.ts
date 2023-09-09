import { sleep } from "../services/sleep";
import { setItem, getItem } from "../services/ls";
import { Todo } from "../interfaces/todo.interface";

export const completeItems = async (ids: string[]) => {
  await sleep(2000);

  const list = getItem("list");

  const updatedList = list.map((el: Todo) => {
    const { id } = el;
    return ids.includes(id) ? { ...el, completed: true } : el;
  });

  setItem("list", updatedList);
};
