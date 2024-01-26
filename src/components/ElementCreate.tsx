"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Sensitivity } from "../types";
import { createElement } from "../util/api";
import useSWRMutation from "swr/mutation";

const allSensitivity = [
  Sensitivity.Critical,
  Sensitivity.Medium,
  Sensitivity.Low,
];

const ElementCreate: React.FC = () => {
  const { push } = useRouter();
  const { trigger } = useSWRMutation("/api/data-elements", createElement);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [includePattern, setIncludePattern] = React.useState("");
  const [excludePattern, setExcludePattern] = React.useState("");
  const [sensitivity, setSensitivity] = React.useState(allSensitivity[0]);
  const [validation, setValidation] = React.useState(true);

  const handleCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!name || !includePattern) {
      setValidation(false);
      return;
    }
    const res = await trigger({
      name,
      description,
      includePattern,
      excludePattern,
      sensitivity,
    });
    if (res.id) {
      push("/");
    } else {
      window.alert("Something went wrong");
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);

  const handleChangeIncludePattern = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIncludePattern(e.target.value);

  const handleChangeExcludePattern = (e: React.ChangeEvent<HTMLInputElement>) =>
    setExcludePattern(e.target.value);

  const handleChangeSensitivity = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSensitivity(e.target.value as Sensitivity);

  return (
    <div className="flex flex-col items-center justify-between p-4">
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-8">
        Create New Element
      </h1>
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-name"
              type="text"
              value={name}
              onChange={handleChangeName}
              required
            />
            {!validation && !name && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-description"
            >
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-description"
              rows={5}
              value={description}
              onChange={handleChangeDescription}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-include-pattern"
            >
              Include Pattern
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-include-pattern"
              type="text"
              value={includePattern}
              onChange={handleChangeIncludePattern}
              required
            />
            {!validation && !includePattern && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-exclude-pattern"
            >
              Exclude Pattern
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-exclude-pattern"
              type="text"
              value={excludePattern}
              onChange={handleChangeExcludePattern}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-sensitivity"
            >
              Sensitivity
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-sensitivity"
                value={sensitivity}
                onChange={handleChangeSensitivity}
                required
              >
                {allSensitivity.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default ElementCreate;
