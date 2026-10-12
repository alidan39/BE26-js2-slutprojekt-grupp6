import { Task } from "../classes/Task";
import { TaskCard } from "./TaskCard";
import type { Member } from "../types/types";

export function renderTasks(tasks: Task[], projectMembers: Member[]): void {
  const newTasks = tasks.filter((task) => task.taskStatus === "new");

  const inProgressTasks = tasks.filter(
    (task) => task.taskStatus === "in-progress",
  );

  const doneTasks = tasks.filter((task) => task.taskStatus === "done");

  const newTasksContainer = document.getElementById("newTasks");

  if (newTasksContainer) {
    newTasksContainer.innerHTML = newTasks
      .map((task) => TaskCard(task, projectMembers))
      .join("");
  }

  const inProgressTasksContainer = document.getElementById("inProgressTasks");

  if (inProgressTasksContainer) {
    inProgressTasksContainer.innerHTML = inProgressTasks
      .map((task) => TaskCard(task, projectMembers))
      .join("");
  }

  const doneTasksContainer = document.getElementById("doneTasks");

  if (doneTasksContainer) {
    doneTasksContainer.innerHTML = doneTasks
      .map((task) => TaskCard(task, projectMembers))
      .join("");
  }
}
