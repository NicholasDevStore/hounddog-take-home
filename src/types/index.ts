export type DataElementOut = {
  id: string;
  name: string;
  description: string;
  includePattern: string;
  excludePattern: string | null;
  sensitivity: string;
};

export type PagedDataElementOut = {
  items: DataElementOut[];
  count: number;
};

export enum Sensitivity {
  Critical = "CRITICAL",
  Medium = "MEDIUM",
  Low = "LOW",
}
