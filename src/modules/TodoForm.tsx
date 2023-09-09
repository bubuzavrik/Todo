import Select from "react-select";
import { Ref, forwardRef } from "react";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { getItem, setItem } from "../services/ls";
import { Input, Textarea, Button, Loader } from "../components";

interface Tag {
  value: string;
  label: string;
}

const tagsOptions: Tag[] = [
  { value: "nákup", label: "nákup" },
  { value: "potraviny", label: "potraviny" },
  { value: "programování", label: "programování" },
  { value: "komunikace", label: "komunikace" },
  { value: "práce", label: "práce" },
  { value: "domácnost", label: "domácnost" },
  { value: "prezentace", label: "prezentace" },
];

interface TodoFormValues {
  ref?: Ref<HTMLInputElement>;
  isEdit?: Boolean;
  setIsEdit?: Function;
  closeModal: Function;
  id?: string;
  title?: string;
  description?: string;
  tags?: string[];
  dueDate?: string;
  completed?: boolean;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const TodoForm = forwardRef<HTMLInputElement, TodoFormValues>(
  (
    {
      closeModal,
      setIsEdit,
      isEdit = false,
      id,
      title,
      description,
      dueDate,
      tags = [],
    },
    ref,
  ) => {
    const {
      control,
      register,
      handleSubmit,

      formState: { errors, isSubmitting },
    } = useForm<TodoFormValues>({
      defaultValues: {
        id,
        title,
        description,
        dueDate,
        tags,
        completed: false,
      },
    });

    const mutation = useMutation({
      mutationFn: async (todo) => {
        const list = getItem("list");

        if (isEdit) {
          const updatedList = list.map(({ id, ...el }) => {
            return todo.id === id ? { ...todo } : { id, ...el };
          });

          setItem("list", updatedList);
          setIsEdit(false);
        } else {
          list.push({ ...todo, id: `${list.length + 1}`, completed: false });
          setItem("list", list);
        }
        closeModal();
      },
    });

    const onSubmit = async (data) => {
      await sleep(2000);
      await mutation.mutate(data);
    };
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 p-2 tablet:p-4"
      >
        <Input
          {...register("title", { required: "Required" })}
          defaultValue={title}
          error={errors.title?.message}
          label="Title"
          type="text"
        />
        <Textarea
          {...register("description", { required: "Required" })}
          defaultValue={description}
          error={errors.description?.message}
          label="Description"
          rows={5}
        />
        <Input
          {...register("dueDate", { required: "Required" })}
          defaultValue={dueDate}
          error={errors.dueDate?.message}
          label="Due date"
          type="date"
          min={
            dueDate
              ? moment(dueDate).valueOf()
              : moment().format("YYYY-MM-DD").valueOf()
          }
        />
        <Controller
          control={control}
          name="tags"
          render={({ field: { onChange, value } }) => (
            <Select
              isClearable={false}
              className="max-w-full w-[500px]"
              isMulti
              name="tags"
              options={tagsOptions}
              value={tagsOptions.filter((el) => value?.includes(el.value))}
              onChange={(option) => {
                if (option === null) {
                  onChange(null);

                  return;
                }

                onChange(option.map((el) => el.value));
              }}
            />
          )}
        />
        {isSubmitting ? (
          <Loader size="md" />
        ) : (
          <Button isDisabled={isSubmitting} type="submit">
            Save
          </Button>
        )}
      </form>
    );
  },
);
