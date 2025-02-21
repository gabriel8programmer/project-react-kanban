import { Task } from "../interfaces/Task";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export class TaskServices {
  static findAll = async (): Promise<Task[]> => {
    const response = await fetch(`${VITE_API_URL}/tasks`);
    const data: Task[] = await response.json();
    return data;
  };

  static create = async (attributes: Omit<Task, "id">): Promise<void> => {
    await fetch(`${VITE_API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attributes),
    });
  };

  static patch = async (id: string, attributes: Partial<Omit<Task, "id">>): Promise<void> => {
    await fetch(`${VITE_API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attributes),
    });
  };

  static update = async (id: string, attributes: Partial<Omit<Task, "id">>): Promise<void> => {
    await fetch(`${VITE_API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attributes),
    });
  };

  static delete = async (id: string): Promise<void> => {
    await fetch(`${VITE_API_URL}/tasks/${id}`, { method: "DELETE" });
  };
}
