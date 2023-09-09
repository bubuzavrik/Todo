import { useState, useContext, MouseEvent, FormEvent } from "react";

import { SelectedTodosCtx, SearchContext } from "../App";
import { Button, Portal, Modal, Input, Dropdown } from "../components";
import { TodoForm } from "../modules";
import { removeItems, completeItems } from "../api";

export const TodoActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selected, clearSelection } = useContext(SelectedTodosCtx);
  const { search, setSearch } = useContext(SearchContext);

  const handleClose = () => setIsOpen(false);

  const handleRemove = async (e: MouseEvent) => {
    await removeItems(selected);
    clearSelection();
  };

  const handleComplete = async (e: MouseEvent) => {
    await completeItems(selected);
    clearSelection();
  };

  const handleCreate = () => {
    setIsOpen(true);
  };
  const buttons = [
    {
      onClick: handleCreate,
      text: "Create Task",
      disabled: false,
    },
    {
      onClick: handleComplete,
      text: "Complete Selected",
      type: "accept",
      disabled: !selected.length,
    },
    {
      onClick: handleRemove,
      text: "Remove Selected",
      type: "decline",
      disabled: !selected.length,
    },
  ];

  const handleSearch = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.currentTarget.value);
  };

  return (
    <>
      {isOpen && (
        <Portal wrapperId="portal-modal">
          <Modal handleClose={handleClose} isOpen={isOpen}>
            <TodoForm closeModal={handleClose} isEdit={false} />
          </Modal>
        </Portal>
      )}
      <div className="mt-4 flex flex-row justify-between items-center">
        <div>
          <Input
            label="Search"
            name="search"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <Dropdown
          target={
            <div className="border border-color-primary px-4 py-2 rounded-md">
              Actions
            </div>
          }
        >
          {buttons.map(({ disabled, onClick, text, type }) => (
            <Button
              key={text}
              isDisabled={disabled}
              onClick={onClick}
              type={type}
            >
              {text}
            </Button>
          ))}
        </Dropdown>
      </div>
    </>
  );
};
