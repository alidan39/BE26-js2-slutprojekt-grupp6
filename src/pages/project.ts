import type { Project, Member, Task } from "../types/types";
import { TaskCard } from "../components/TaskCard";

const testProject: Project = {
  id: "project-1",
  name: "Scrum Board",
  description: "Vårt projekt för scrum board appen",
  deadline: "2026-10-16",
  memberIds: ["member-1", "member-2", "member-3"],
  taskIds: ["task-1", "task-2", "task-3"],
};

const testMembers: Member[] = [
  {
    id: "member-1",
    name: "Anna",
    category: "frontend",
    activeTasks: 1,
  },
  {
    id: "member-2",
    name: "Erik",
    category: "backend",
    activeTasks: 1,
  },
  {
    id: "member-3",
    name: "Lisa",
    category: "ux",
    activeTasks: 0,
  },
];

const testTasks: Task[] = [
  {
    id: "task-1",
    title: "Bygga startsida",
    description: "Skapa startsidan",
    category: "frontend",
    taskStatus: "new",
    priority: 2,
    deadline: "2026-10-10",
    createdAt: Date.now(),
  },
  {
    id: "task-2",
    title: "Koppla Firebase",
    description: "Koppla appen till Firebase",
    category: "backend",
    taskStatus: "in-progress",
    priority: 3,
    deadline: "2026-10-08",
    createdAt: Date.now(),
    memberId: "member-2",
  },
  {
    id: "task-3",
    title: "Designa knappar",
    description: "Skapa design för knappar",
    category: "ux",
    taskStatus: "done",
    priority: 1,
    deadline: "2026-10-05",
    createdAt: Date.now(),
    memberId: "member-3",
    completedAt: Date.now(),
  },
];

console.log(testProject);
console.log(testMembers);
console.log(testTasks);

const newTasks = testTasks.filter((task) => task.taskStatus === "new");
const inProgressTasks = testTasks.filter(
  (task) => task.taskStatus === "in-progress",
);
const doneTasks = testTasks.filter((task) => task.taskStatus === "done");
const frontendTasks = testTasks.filter((task) => task.category === "frontend");

function filterByCategory(tasks: Task[], category: string): Task[] {
  return tasks.filter((task) => task.category === category);
}
function filterByMember(tasks: Task[], memberId: string): Task[] {
  return tasks.filter((task) => task.memberId === memberId);
}
function sortByEarliestDeadline(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
  );
}
function sortByLatestDeadline(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime(),
  );
}
const sortedByLatestDeadline = sortByLatestDeadline(testTasks);
const sortedByDeadline = sortByEarliestDeadline(testTasks);
const erikTasks = filterByMember(testTasks, "member-2");
const backendTasks = filterByCategory(testTasks, "backend");
console.log(sortedByLatestDeadline);
console.log(sortedByDeadline);
console.log(erikTasks);
console.log(backendTasks);
console.log(frontendTasks);
console.log(doneTasks);

console.log(inProgressTasks);

console.log(newTasks);

const taskCard = TaskCard(testTasks[0]);
console.log(taskCard);
