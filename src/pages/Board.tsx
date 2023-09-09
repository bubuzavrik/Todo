import { Key, useEffect, useContext } from "react";
import { useQuery } from "react-query";

import mockedList from "../mock/list";

import { Todo } from "../interfaces/todo.interface";

import { List, TodoCard } from "../modules";
import { Loader } from "../components/";
import { SearchContext } from "../App";
import { getItem, setItem } from "../services/ls";
import { getTodosList } from "../api";

const statuses = [
  { completed: false, name: "In Progress" },
  { completed: true, name: "Completed" },
];

export const Board = () => {
  const { search } = useContext(SearchContext);

  useEffect(() => {
    const list = getItem("list");

    if (!list || !list?.length) {
      setItem("list", mockedList);
    }
  }, []);

  const { data, isLoading } = useQuery<Todo[], Error>({
    queryKey: "todos",
    refetchInterval: 3000,
    queryFn: getTodosList(search),
  });

  if (isLoading) return <Loader size={"lg"} />;

  return (
    <div className="flex flex-col gap-4 mt-2 tablet:flex-row">
      {statuses.map(({ completed, name }) => (
        <List key={name} name={name}>
          {data
            ?.map(
              ({ completed: isCompleted, id, ...todo }) =>
                isCompleted === completed && (
                  <TodoCard
                    key={id as Key}
                    completed={isCompleted}
                    id={id}
                    {...todo}
                  />
                )
            )
            .filter(Boolean)}
        </List>
      ))}
    </div>
  );
};
