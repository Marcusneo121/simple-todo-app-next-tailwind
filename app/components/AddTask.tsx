"use client";

import { FormEventHandler, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Modal from "./Modal";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTextValue, setNewTextValue] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTextValue,
    }).then(() => {
      setNewTextValue("");
      setModalOpen(false);
      router.refresh();
    });
  };

  return (
    <div>
      <button
        onClick={() => {
          setModalOpen(true);
        }}
        className="btn btn-primary w-full rounded-xl text-base"
      >
        Add New Task
        <FaPlus className="ml-2" size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input
              value={newTextValue}
              onChange={(value) => {
                setNewTextValue(value.target.value);
              }}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <button onClick={() => {}} type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
