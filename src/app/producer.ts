import { Task } from "types/task";

export const generate_task = (): Task => {
  return {
    id: Date.now(),
    processing_time: Math.floor(Math.random() * 10000) + 1,
    created_at: Date.now(),
  };
};
