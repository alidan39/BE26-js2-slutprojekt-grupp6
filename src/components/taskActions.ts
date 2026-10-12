import { Task } from "../classes/Task";

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
