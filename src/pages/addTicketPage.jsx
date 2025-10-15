import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import useTypeOptions from "../store/utils";
import { ticketsAPI } from "../api/api";
import { HOME } from "../routes";

export default function AddTicketPage() {
  const [title, setTitle] = useState("");
  const [fileType, setFileType] = useState("");
  const [totalNumber, setTotalNumber] = useState(0);
  const [description, setDescription] = useState("");
  const [actProf, setActProf] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { typeOptions } = useTypeOptions();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !fileType || !totalNumber || totalNumber <= 0) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const ticketData = {
        title,
        fileType,
        description: description || "",
        actProf: actProf || "",
        totalNumber: parseInt(totalNumber),
      };

      const result = await ticketsAPI.create(ticketData, file);

      if (result.success) {
        alert("Ticket créé avec succès!");
        navigate(HOME);
      } else {
        setError(result.message || "Erreur lors de la création du ticket");
      }
    } catch (err) {
      setError("Erreur lors de la création du ticket");
      console.error("Error creating ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="container p-2 my-2">
        <h1 className="text-2xl font-bold p-2 text-indigo-500 flex gap-2 items-center justify-center md:justify-start">
          <PlusCircleIcon className="size-6 md:size-10 " />
          Creat New Ticket
        </h1>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12 mx-auto">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
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
                onChange={(e) => setFile(e.target.files[0])}
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
                value={fileType}
                onChange={(selectedOption) => {
                  setFileType(selectedOption?.value || "");
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
              disabled={loading}
              className="inline-block w-full rounded-lg bg-indigo-500 px-5 py-3 font-medium text-white max-w-xs disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-indigo-600"
            >
              {loading ? "Création..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
