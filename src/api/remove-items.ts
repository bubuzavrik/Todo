import { sleep } from "../services/sleep";
import { setItem, getItem } from "../services/ls";
import { Todo } from "../interfaces/todo.interface";

export const removeItems = async (ids: string[]) => {
  await sleep(2000);
  const list = getItem("list");

  const updatedList = list.filter((el: Todo) => !ids.includes(el.id));
  setItem("list", updatedList);
};
