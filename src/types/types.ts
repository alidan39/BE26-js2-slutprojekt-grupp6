export type Category = 'frontend' | 'backend' | 'ux';
export type TaskStatus = 'new' | 'in-progress' | 'done';
export type Priority = 1 | 2 | 3;

export interface Project {
    id: string;
    name: string;
    description: string;
    deadline: string;
    memberIds: string[];
    taskIds: string[];
}

export interface Member {
    id: string;
    name: string;
    category: Category;
    activeTasks: number;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    category: Category;
    taskStatus: TaskStatus;
    priority: Priority;
    deadline: string;
    createdAt: number;
    memberId?: string;
    completedAt?: number;
}

