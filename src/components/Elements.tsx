"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { FETCH_COUNT, deleteElement, fetcher } from "@/src/lib";
import { DataElementOut, PagedDataElementOut } from "@/src/types";
import { useScrollToBottom } from "@/src/hooks";
import PageLoading from "./PageLoading";
import PageError from "./PageError";

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
  const [deletingId, setDeletingId] = React.useState("");
  const { push } = useRouter();
  const { data, error, size, setSize, mutate } = useSWRInfinite(
    getKey,
    fetcher
  );
  const { trigger } = useSWRMutation("/api/data-elements", deleteElement);

  const handleScrollToBottom = () => {
    // When user scrolls to the bottom of the screen, pagination is done
    setSize(size + 1);
  };

  const scrollRef = useScrollToBottom(handleScrollToBottom);

  const handleDelete = async (elementId: string) => {
    try {
      setDeletingId(elementId);
      const res = await trigger({
        id: elementId,
      });
      if (res === 200) {
        await mutate();
      } else {
        window.alert("Something went wrong!");
      }
    } catch (err) {
    } finally {
      setDeletingId("");
    }
  };

  const handleCreate = () => {
    push("/create-element");
  };

  if (error) return <PageError />;
  if (!data?.length) return <PageLoading />;

  return (
    <div ref={scrollRef} className="p-8 overflow-auto h-screen">
      <div className="flex items-center justify-between py-2">
        <span>Total count: {data[0]?.count}</span>
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
                  {deletingId === element.id ? (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-8 h-8 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#FF0000"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    <button
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => handleDelete(element.id)}
                    >
                      Delete
                    </button>
                  )}
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
