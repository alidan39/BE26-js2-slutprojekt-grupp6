import type { Task } from "../types/types";

export function TaskCard(task: Task): string {
  return `
    <article>
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Kategori: ${task.category}</p>
      <p>Deadline: ${task.deadline}</p>
    </article>
  `;
}
