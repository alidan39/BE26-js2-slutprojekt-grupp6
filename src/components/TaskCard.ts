import { Task } from "../classes/Task";
import type { Member } from "../types/types";

export function TaskCard(task: Task, projectMembers: Member[]): string {
  const member = projectMembers.find((member) => member.id === task.memberId);

  const matchingMembers = projectMembers.filter(
    (member) => member.category === task.category,
  );

  const createdDate = new Date(task.createdAt).toLocaleDateString("sv-SE");

  const completedDate = task.completedAt
    ? new Date(task.completedAt).toLocaleDateString("sv-SE")
    : "";

  return `
    <article class="task-card">
      <h3>${task.title}</h3>

      <div class="task-description">
      <strong>Beskrivning</strong>
      <p>${task.description}</p>
      </div>

      <div class="task-info">
        <p><strong>Category:</strong> ${task.category}</p>
        <p><strong>Status:</strong> ${task.taskStatus}</p>
        ${
          task.taskStatus === "done"
            ? `
              <p><strong>Priority:</strong> ${task.priority}</p>
              <p><strong>Deadline:</strong> ${task.deadline}</p>
            `
            : `
              <label for="priority-${task.id}">Priority</label>
              <select
                id="priority-${task.id}"
                class="priority-select"
                data-task-id="${task.id}"
              >
                <option value="1" ${task.priority === 1 ? "selected" : ""}>Low</option>
                <option value="2" ${task.priority === 2 ? "selected" : ""}>Medium</option>
                <option value="3" ${task.priority === 3 ? "selected" : ""}>High</option>
              </select>

              <label for="deadline-${task.id}">Deadline</label>
              <input
                type="date"
                id="deadline-${task.id}"
                class="deadline-input"
                data-task-id="${task.id}"
                value="${task.deadline}"
              />
            `
        }
        <p><strong>Assigned to:</strong> ${member ? member.name : "Unassigned"}</p>
        <p><strong>Created:</strong> ${createdDate}</p>

        ${
          task.taskStatus === "new" && !task.memberId
            ? `
              <label for="assign-${task.id}">Assign member</label>
              <select
                id="assign-${task.id}"
                class="assign-member-select"
                data-task-id="${task.id}"
              >
                <option value="">Choose member</option>
                ${matchingMembers
                  .map(
                    (member) => `
                      <option value="${member.id}">${member.name}</option>
                    `,
                  )
                  .join("")}
              </select>
            `
            : ""
        }

        ${
          task.taskStatus === "done" && task.completedAt
            ? `<p><strong>Completed:</strong> ${completedDate}</p>`
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
