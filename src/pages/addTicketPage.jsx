import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

export default function AddTicketPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {};

  return (
    <React.Fragment>
      <div className="container p-2 my-2">
        <h1 className="text-2xl font-bold p-2 text-indigo-500 flex gap-2 items-center justify-center md:justify-start">
          <PlusCircleIcon className="size-6 md:size-10 " />
          Creat New Ticket
        </h1>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12 mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title :
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nom"
                type="text"
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description :
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={5}
                id="description"
                type="text"
                defaultValue={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-block w-full rounded-lg bg-indigo-500 px-5 py-3 font-medium text-white max-w-xs"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
