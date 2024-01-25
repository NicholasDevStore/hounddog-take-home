import { Sensitivity } from "../types";

export const deleteElement = async (elementId: string) => {
  const res = await fetch(`/api/data-elements?id=${elementId}`, {
    method: "DELETE",
  });
  return await res.json();
};

export const createElement = async ({
  name,
  description,
  includePattern,
  excludePattern,
  sensitivity,
}: {
  name: string;
  description?: string;
  includePattern: string;
  excludePattern?: string;
  sensitivity: Sensitivity;
}) => {
  const res = await fetch("/api/data-elements", {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      includePattern,
      excludePattern,
      sensitivity,
    }),
  });
  return await res.json();
};
