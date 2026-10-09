import { Task } from "../classes/Task";

export function filterByCategory(tasks: Task[], category: string): Task[] {
  return tasks.filter((task) => task.category === category);
}

export function filterByMember(tasks: Task[], memberId: string): Task[] {
  return tasks.filter((task) => task.memberId === memberId);
}

export function sortByEarliestDeadline(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
  );
}

export function sortByLatestDeadline(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime(),
  );
}

export function sortByTitleAZ(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
}

export function sortByTitleZA(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => b.title.localeCompare(a.title));
}

export function applyTaskFilters(
  tasks: Task[],
  category: string,
  memberId: string,
  sort: string,
): Task[] {
  let result = [...tasks];

  if (category !== "") {
    result = filterByCategory(result, category);
  }

  if (memberId !== "") {
    result = filterByMember(result, memberId);
  }

  if (sort === "earliest") {
    result = sortByEarliestDeadline(result);
  }

  if (sort === "latest") {
    result = sortByLatestDeadline(result);
  }

  if (sort === "title-az") {
    result = sortByTitleAZ(result);
  }

  if (sort === "title-za") {
    result = sortByTitleZA(result);
  }

  return result;
}
