"use client";

import { ITask } from "@/types/tasks";
import React, { FormEventHandler, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { editTodo, deleteTodo } from "@/api";
import { v4 as uuidv4 } from "uuid";

interface TodoProps {
  task: ITask;
}

const Task: React.FC<TodoProps> = ({ task }) => {
  const router = useRouter();
  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
  const [newEditedTextValue, setEditedTextValue] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(newEditedTextValue);
    await editTodo({
      id: task.id,
      text: newEditedTextValue,
    }).then(() => {
      // setEditedTextValue("");
      setModalOpenEdit(false);
      router.refresh();
    });
  };

  const handleDeleteTodo = async () => {
    await deleteTodo(task.id).then(() => {
      setModalOpenDelete(false);
      router.refresh();
    });
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => {
            setModalOpenEdit(true);
          }}
          cursor="pointer"
          className="text-blue-500"
          size={20}
        />
        <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className="modal-action">
              <input
                value={newEditedTextValue}
                onChange={(value) => {
                  setEditedTextValue(value.target.value);
                }}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => {
            setModalOpenDelete(true);
          }}
          cursor="pointer"
          className="text-red-500"
          size={20}
        />
        <Modal modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
          <h3 className="text-lg">
            Are you sure, you want to delete this task?
          </h3>
          <div className="modal-action">
            <button
              onClick={() => {
                handleDeleteTodo();
              }}
              className="btn"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setModalOpenDelete(false);
              }}
              className="btn btn-error text-white"
            >
              No
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
