import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import Select from "react-select";
import useTypeOptions from "../store/utils";

export default function AddTicketPage() {
  const [title, setTitle] = useState("");
  const [fileType, setFileType] = useState("");
  const [totalNumber, setTotalNumber] = useState(0);
  const [description, setDescription] = useState("");
  const { typeOptions } = useTypeOptions();

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
                htmlFor="file"
                className="block text-sm font-medium text-gray-700"
              >
                File :
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="file"
                type="file"
              />
            </div>

            <div>
              <label
                htmlFor="fileType"
                className="block text-sm font-medium text-gray-700"
              >
                Type :
              </label>
              <Select
                className="shadow appearance-none border rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={5}
                id="fileType"
                type="text"
                defaultValue={fileType}
                onChange={(e) => {
                  setFileType(e.target.value);
                }}
                options={typeOptions}
              />
            </div>

            <div>
              <label
                htmlFor="totalNumber"
                className="block text-sm font-medium text-gray-700"
              >
                nombre de copies :
              </label>
              <input
                className="shadow appearance-none border rounded w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={5}
                id="totalNumber"
                type="number"
                min={0}
                max={200}
                defaultValue={totalNumber}
                onChange={(e) => {
                  setTotalNumber(e.target.value);
                }}
              />
            </div>

            <div>
              <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
              >
              Note :
              </label>
              <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
              leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
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
