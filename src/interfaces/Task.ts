export type StatusTask = "todo" | "doing" | "done";
export type PriorityTask = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
}
