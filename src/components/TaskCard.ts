import { Task } from "../classes/Task";

export function TaskCard(task: Task): string {
  return `
    <article>
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Kategori: ${task.category}</p>
      <p>Status: ${task.taskStatus}</p>
      <p>Deadline: ${task.deadline}</p>
      <p>Prioritet:${task.priority}</p>
      <p>Skapad: ${new Date(task.createdAt).toLocaleDateString("sv-SE")}</p>
    </article>
  `;
}
