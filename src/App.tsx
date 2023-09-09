import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Board } from "./pages/Board";
import { TodoActions } from "./modules";

interface TodosCtx {
  selected: String[];
  changeSelection: Function;
  clearSelection: Function;
}

const queryClient = new QueryClient();
export const SelectedTodosCtx = createContext<TodosCtx>({
  selected: [],
  changeSelection: () => {},
  clearSelection: () => {},
});

interface SearchCtx {
  search: string;
  setSearch: Function;
}

export const SearchContext = createContext<SearchCtx>({
  search: "",
  setSearch: () => {},
});

const App = () => {
  const [selected, setSelected] = useState<String[]>([]);
  const [search, setSearch] = useState<string>("");

  const clearSelection = () => setSelected([]);
  const changeSelection = (id: String) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((el) => el !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SearchContext.Provider value={{ search, setSearch }}>
        <SelectedTodosCtx.Provider
          value={{ clearSelection, changeSelection, selected }}
        >
          <div className="p-6 bg-background min-h-screen h-full w-full">
            <h1 className="font-bold text-5xl">TODO</h1>
            <TodoActions />
            <Board />
          </div>
        </SelectedTodosCtx.Provider>
      </SearchContext.Provider>
      <div id="portal-modal" />
    </QueryClientProvider>
  );
};

export default App;
