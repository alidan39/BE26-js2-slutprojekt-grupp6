import { Task } from "../classes/Task";
import type { Member } from "../types/types";

export function TaskCard(task: Task, projectMembers: Member[]): string {
  const member = projectMembers.find((member) => member.id === task.memberId);

  const createdDate = new Date(task.createdAt).toLocaleDateString("sv-SE");

  const completedDate = task.completedAt
    ? new Date(task.completedAt).toLocaleDateString("sv-SE")
    : "";

  return `
    <article class="task-card">
      <h3>${task.title}</h3>

      <p>${task.description}</p>

      <div class="task-info">
        <p>
          <strong>Category:</strong>
          ${task.category}
        </p>

        <p>
          <strong>Status:</strong>
          ${task.taskStatus}
        </p>

        <p>
          <strong>Priority:</strong>
          ${task.priority}
        </p>

        <p>
          <strong>Deadline:</strong>
          ${task.deadline}
        </p>

        <p>
          <strong>Assigned to:</strong>
          ${member ? member.name : "Unassigned"}
        </p>

        <p>
          <strong>Created:</strong>
          ${createdDate}
        </p>

        ${
          task.taskStatus === "done" && task.completedAt
            ? `
              <p>
                <strong>Completed:</strong>
                ${completedDate}
              </p>
            `
            : ""
        }

        ${
          task.taskStatus === "in-progress"
            ? `
              <button
                type="button"
                class="complete-task-btn"
                data-task-id="${task.id}"
              >
                Mark as completed
              </button>
            `
            : ""
        }

        ${
          task.taskStatus === "done"
            ? `
              <button
                type="button"
                class="archive-task-btn"
                data-task-id="${task.id}"
              >
                Archive
              </button>
            `
            : ""
        }
      </div>
    </article>
  `;
}
