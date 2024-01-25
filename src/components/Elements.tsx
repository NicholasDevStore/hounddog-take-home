"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "../util";
import { DataElementOut, PagedDataElementOut } from "../types";
import { deleteElement } from "../util/api";
import { useScrollToBottom } from "../hooks";
import useSWRInfinite from "swr/infinite";

const FETCH_COUNT = 50;

// A function to get the SWR key of each page,
// its return value will be accepted by `fetcher`.
// If `null` is returned, the request of that page won't start.
const getKey = (pageIndex: number, previousPageData: PagedDataElementOut) => {
  if (previousPageData && !previousPageData.items.length) return null; // reached the end
  return `/api/data-elements?offset=${
    pageIndex * FETCH_COUNT
  }&limit=${FETCH_COUNT}`; // SWR key
};

const Elements: React.FC = () => {
  const { push } = useRouter();
  const [page, setPage] = React.useState(0);
  const { data, error, size, setSize, mutate } = useSWRInfinite(
    getKey,
    fetcher
  );

  const handleScrollToBottom = () => {
    console.log("Scrolled to the bottom!");
    setSize(size + 1);
  };

  const scrollRef = useScrollToBottom(handleScrollToBottom);

  const handleDelete = async (elementId: string) => {
    await deleteElement(elementId);
    mutate();
  };

  const handleCreate = () => {
    push("/create-element");
  };

  if (error) return <div className="p-8">An error has occurred.</div>;
  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div ref={scrollRef} className="p-8 overflow-auto h-screen">
      <div className="flex items-center items-center justify-between py-2">
        <span>Total count: {data[0].count}</span>
        <button
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th hidden>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Include Pattern</th>
            <th>Exclude Pattern</th>
            <th>Sensitivity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ items }) => {
            return items.map((element: DataElementOut) => (
              <tr key={element.id}>
                <td hidden>{element.id}</td>
                <td>{element.name}</td>
                <td>{element.description}</td>
                <td>{element.includePattern}</td>
                <td>{element.excludePattern}</td>
                <td>{element.sensitivity}</td>
                <td>
                  <button
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => handleDelete(element.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Elements;
