import type { FirebaseTask, Member } from "../types/types";
import { Task } from "../classes/Task";
import { getProjects } from "../firebase/projectRequests";
import { getTasks, postTask } from "../firebase/taskRequests";
import { getMembers } from "../firebase/memberRequests";
import { getTaskFormValues } from "../components/TaskForm";

import { renderTasks } from "../components/taskRenderer";

import { applyTaskFilters } from "../components/taskFilters";

import { setupTaskActions } from "../components/taskActions";

const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

let projectMembers: Member[] = [];
let projectTasks: Task[] = [];

const projectName = document.getElementById("projectName");
const projectDescription = document.getElementById("projectDescription");
const projectDeadline = document.getElementById("projectDeadline");

const taskCategorySelect = document.getElementById(
  "taskCategory",
) as HTMLSelectElement;

const taskMemberSelect = document.getElementById(
  "taskMember",
) as HTMLSelectElement;

const categoryFilter = document.getElementById(
  "categoryFilter",
) as HTMLSelectElement;

const memberFilter = document.getElementById(
  "memberFilter",
) as HTMLSelectElement;

const sortTasks = document.getElementById("sortTasks") as HTMLSelectElement;

const taskForm = document.getElementById("taskForm") as HTMLFormElement;

async function loadProject(): Promise<void> {
  try {
    const projects = await getProjects();

    const project = projects.find((project) => project.id === projectId);

    if (!project) {
      return;
    }

    const tasks = await getTasks();
    const members = await getMembers();

    projectTasks = tasks.filter((task) => project.taskIds.includes(task.id));

    projectMembers = members.filter((member) =>
      project.memberIds.includes(member.id),
    );

    if (projectName) {
      projectName.textContent = project.name;
    }

    if (projectDescription) {
      projectDescription.textContent = project.description;
    }

    if (projectDeadline) {
      projectDeadline.textContent = `Deadline: ${project.deadline}`;
    }

    memberFilter.innerHTML = `
      <option value="">All members</option>
    `;

    projectMembers.forEach((member) => {
      memberFilter.innerHTML += `
        <option value="${member.id}">
          ${member.name}
        </option>
      `;
    });

    const projectMembersContainer = document.getElementById("projectMembers");

    if (projectMembersContainer) {
      projectMembersContainer.innerHTML = projectMembers
        .map((member) => {
          const activeTasks = projectTasks.filter(
            (task) =>
              task.memberId === member.id && task.taskStatus === "in-progress",
          ).length;

          return `
              <p>
                ${member.name} -
                ${member.category} -
                Active tasks: ${activeTasks}
              </p>
            `;
        })
        .join("");
    }

    updateTaskView();
  } catch (error) {
    console.error(error);

    alert("Could not load project data. Please try again.");
  }
}

function updateTaskView(): void {
  const filteredAndSortedTasks = applyTaskFilters(
    projectTasks,
    categoryFilter.value,
    memberFilter.value,
    sortTasks.value,
  );

  renderTasks(filteredAndSortedTasks, projectMembers);
}

function getProjectTasks(): Task[] {
  return projectTasks;
}

if (projectId) {
  setupTaskActions(getProjectTasks, projectId, loadProject);
}

categoryFilter.addEventListener("change", () => {
  updateTaskView();
});

memberFilter.addEventListener("change", () => {
  updateTaskView();
});

sortTasks.addEventListener("change", () => {
  updateTaskView();
});

// CVälj medlem baserat på kategori.
taskCategorySelect.addEventListener("change", () => {
  taskMemberSelect.innerHTML = `
      <option value="">Choose member</option>
    `;

  projectMembers
    .filter((member) => member.category === taskCategorySelect.value)
    .forEach((member) => {
      taskMemberSelect.innerHTML += `
          <option value="${member.id}">
            ${member.name}
          </option>
        `;
    });
});

// Skapa uppgift.
if (taskForm) {
  taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const { title, description, category, priority, deadline, memberId } =
      getTaskFormValues();

    const taskStatus = memberId ? "in-progress" : "new";

    const createdAt = Date.now();

    const newTask: FirebaseTask = {
      title,
      description,
      category,
      taskStatus,
      priority,
      deadline,
      createdAt,
      memberId: memberId || undefined,
    };

    if (!projectId) {
      return;
    }

    try {
      await postTask(newTask, projectId);

      taskForm.reset();

      await loadProject();
    } catch (error) {
      console.error(error);

      alert("Could not create task. Please try again.");
    }
  });
}

loadProject();
