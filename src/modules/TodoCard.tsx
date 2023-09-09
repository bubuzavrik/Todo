import { FC, Key, useState } from "react";
import moment from "moment";

import { Card, Portal, Modal, Tag, Button, TodoCheck } from "../components";
import { Todo } from "../interfaces/todo.interface";
import { TodoForm } from "./TodoForm";
import { removeItem, completeItem } from "../api";

interface Props extends Todo {
  selectCard?: Function;
}

export const TodoCard: FC<Props> = ({
  id,
  title,
  tags,
  description,
  dueDate,
  completed,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const buttons = [
    {
      onClick: removeItem(id),
      text: "Remove",
      type: "decline",
    },
    {
      onClick: handleEdit,
      text: isEdit ? "Cancel" : "Edit",
    },
    {
      onClick: completeItem(id),
      text: "Complete",
      type: "accept",
    },
  ];

  return (
    <>
      {isOpen && (
        <Portal wrapperId="portal-modal">
          <Modal handleClose={handleClose} isOpen={isOpen}>
            <div id={`todo-${id}`} />
            {isEdit ? (
              <Portal wrapperId={`todo-${id}`}>
                <TodoForm
                  closeModal={handleClose}
                  setIsEdit={setIsEdit}
                  isEdit={isEdit}
                  id={id}
                  title={title}
                  description={description}
                  dueDate={dueDate}
                  tags={tags}
                />
              </Portal>
            ) : (
              <div className="flex flex-col gap-2 p-2 tablet:p-4 tablet:w-[532px]">
                <div className="flex flex-row justify-between">
                  <div className="font-bold text-2xl">{title}</div>
                  {!completed && <TodoCheck id={id} />}
                </div>
                <div className="text-md text-secondary h-[200px] overflow-y-auto">
                  {description}
                </div>
                <div className="">
                  Due date: {moment(dueDate).format("YYYY-MM-DD")}
                </div>
                <div className="flex flex-wrap flex-row gap-2 mt-4">
                  {tags.map((tag) => (
                    <Tag key={tag as Key} tag={tag} />
                  ))}
                </div>
              </div>
            )}

            <div className="h-full flex flex-col justify-end">
              <div className="border-primary border-t p-2 mt-2 flex flex-row gap-4 w-full justify-between tablet:p-4">
                {buttons.map(({ onClick, text, type }) => (
                  <Button
                    key={text}
                    isDisabled={completed}
                    onClick={onClick}
                    type={type}
                  >
                    {text}
                  </Button>
                ))}
              </div>
            </div>
          </Modal>
        </Portal>
      )}
      <Card classNames={"cursor-pointer px-0 py-0 overflow-hidden"}>
        <div className="p-3" onClick={handleOpen}>
          <div className="flex flex-row justify-between">
            <div className="font-bold text-xl">{title}</div>
            {!completed && <TodoCheck id={id} />}
          </div>
          <div className="text-sm text-secondary">{description}</div>
          <div className="flex flex-row gap-x-2 mt-8">
            {tags.slice(0, 3).map((tag) => (
              <Tag key={tag as Key} tag={tag} />
            ))}
            <div className="flex items-end">{tags.length > 3 && "..."}</div>
          </div>
        </div>
      </Card>
    </>
  );
};
