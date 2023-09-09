import { sleep } from "../services/sleep";
import { setItem, getItem } from "../services/ls";

export const removeItem = (id: string) => async () => {
  await sleep(2000);
  const list: Todo[] = getItem("list");

  const updatedList = list.filter(({ id: _id }) => id !== _id);

  setItem("list", updatedList);
};
