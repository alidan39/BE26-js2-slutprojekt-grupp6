import { Task } from "../classes/Task";

export function setupTaskActions(
  getProjectTasks: () => Task[],
  projectId: string,
  reloadProject: () => Promise<void>,
): void {
  document.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("complete-task-btn")) {
      const taskId = target.dataset.taskId;

      if (!taskId) {
        return;
      }

      const task = getProjectTasks().find((task) => task.id === taskId);

      if (!task) {
        return;
      }

      try {
        await task.complete();
        await reloadProject();
      } catch (error) {
        console.error(error);
        alert("Could not complete task. Please try again.");
      }

      return;
    }

    if (target.classList.contains("archive-task-btn")) {
      const taskId = target.dataset.taskId;

      if (!taskId) {
        return;
      }

      const task = getProjectTasks().find((task) => task.id === taskId);

      if (!task) {
        return;
      }

      try {
        await task.archive(projectId);
        await reloadProject();
      } catch (error) {
        console.error(error);
        alert("Could not archive task. Please try again.");
      }
    }
  });
}
