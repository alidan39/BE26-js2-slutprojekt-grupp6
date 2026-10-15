import type { Category, Priority } from "../types/types";
// Hämtar värderna från formuläret och ger tillbaka dem som ett objekt.
export function getTaskFormValues() {
  const titleInput = document.getElementById("taskTitle") as HTMLInputElement;
  const descriptionInput = document.getElementById(
    "taskDescription",
  ) as HTMLTextAreaElement;
  const categoryInput = document.getElementById(
    "taskCategory",
  ) as HTMLSelectElement;
  const priorityInput = document.getElementById(
    "taskPriority",
  ) as HTMLSelectElement;
  const deadlineInput = document.getElementById(
    "taskDeadline",
  ) as HTMLInputElement;

  const title = titleInput.value;
  const description = descriptionInput.value;
  const category = categoryInput.value as Category;
  const priority = Number(priorityInput.value) as Priority;
  const deadline = deadlineInput.value;

  return {
    title,
    description,
    category,
    priority,
    deadline,
  };
}
