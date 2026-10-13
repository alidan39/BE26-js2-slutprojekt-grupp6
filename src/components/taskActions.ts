import { Task } from "../classes/Task";
import type { Priority } from "../types/types";

export function setupTaskActions(
  getProjectTasks: () => Task[],
  projectId: string,
  reloadProject: () => Promise<void>,
): void {
  document.addEventListener("change", async (event) => {
    const target = event.target as HTMLSelectElement;

    if (!target.classList.contains("assign-member-select")) {
      return;
    }

    const taskId = target.dataset.taskId;
    const memberId = target.value;

    if (!taskId || !memberId) {
      return;
    }

    const task = getProjectTasks().find((task) => task.id === taskId);

    if (!task || task.taskStatus !== "new" || task.memberId) {
      return;
    }

    target.disabled = true;

    try {
      await task.assignMember(memberId);
      await reloadProject();
    } catch (error) {
      console.error(error);
      alert("Could not assign member. Please try again.");
      target.disabled = false;
    }
  });

  // Ändra deadline eller prioritet på en uppgift
  document.addEventListener("change", async (event) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;

    const isDeadline = target.classList.contains("deadline-input");
    const isPriority = target.classList.contains("priority-select");

    if (!isDeadline && !isPriority) {
      return;
    }

    const taskId = target.dataset.taskId;

    if (!taskId || !target.value) {
      return;
    }

    const task = getProjectTasks().find((task) => task.id === taskId);

    if (!task) {
      return;
    }

    target.disabled = true;

    try {
      if (isDeadline) {
        await task.updateDeadline(target.value);
      } else {
        await task.updatePriority(Number(target.value) as Priority);
      }

      await reloadProject();
    } catch (error) {
      console.error(error);

      alert(
        isDeadline
          ? "Could not update deadline. Please try again."
          : "Could not update priority. Please try again.",
      );
      target.disabled = false;
    }
  });

  document.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;

    if (
      target.classList.contains("complete-task-btn") ||
      target.classList.contains("archive-task-btn")
    ) {
      const taskId = target.dataset.taskId;

      if (!taskId) {
        return;
      }

      const task = getProjectTasks().find((task) => task.id === taskId);

      if (!task) {
        return;
      }

      try {
        if (target.classList.contains("complete-task-btn")) {
          await task.complete();
        } else {
          await task.archive(projectId);
        }

        await reloadProject();
      } catch (error) {
        console.error(error);

        alert(
          target.classList.contains("complete-task-btn")
            ? "Could not complete task. Please try again."
            : "Could not archive task. Please try again.",
        );
      }
    }
  });
}
