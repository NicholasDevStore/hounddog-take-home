"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Sensitivity } from "@/src/types";
import { createElement } from "@/src/lib";
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
  const [isLoading, setLoading] = React.useState(false);

  const handleCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !includePattern) {
      setValidation(false);
      setLoading(false);
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
    setLoading(false);
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
    <div className="flex flex-col items-center p-8 h-screen overflow-auto">
      <h1 className="text-2xl font-bold leading-7 text-gray-900 mb-8">
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
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            onClick={handleCreate}
          >
            {isLoading && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            Create New
          </button>
        </div>
      </form>
    </div>
  );
};

export default ElementCreate;
