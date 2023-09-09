import { sleep } from "../services/sleep";
import { getItem } from "../services/ls";

export const getTodosList = (search: string) => async () => {
  await sleep(2000);
  const list = getItem("list");

  if (search) {
    const filteredList = list.filter((el) => {
      return (
        el.title.includes(search) ||
        el.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
      );
    });

    return Promise.resolve(filteredList);
  }

  return Promise.resolve(list);
};
