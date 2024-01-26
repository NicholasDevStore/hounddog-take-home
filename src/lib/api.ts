import { Sensitivity } from "../types";

export const deleteElement = async (
  url: string,
  { arg }: { arg: { id: string } }
) => {
  const { id } = arg;
  const res = await fetch(`${url}?id=${id}`, {
    method: "DELETE",
  });
  return res.status;
};

export const createElement = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      name: string;
      description?: string;
      includePattern: string;
      excludePattern?: string;
      sensitivity: Sensitivity;
    };
  }
) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  return await res.json();
};
