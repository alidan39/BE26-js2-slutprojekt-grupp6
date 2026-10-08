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
    archived: boolean;
}

export interface Member {
    id: string;
    name: string;
    category: Category;
    activeTasks: number;
}

// Så ligger datan i Firebase: id:t är inte med i objektet, det är nyckeln utanför
export interface FirebaseProject {
    name: string;
    description: string;
    deadline: string;
    memberIds?: string[];
    taskIds?: string[];
    archived?: boolean;
}

export interface FirebaseMember {
    name: string;
    category: Category;
    activeTasks: number;
}

export interface FirebaseTask {
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

// En arkiverad uppgift: uppgiften som den var, plus vilket projekt den kom från
export interface FirebaseArchive {
    projectId: string;
    task: FirebaseTask;
}

// En arkiverad uppgift i appen: id:t + det som ligger i Firebase
export interface ArchivedTask {
    id: string;
    projectId: string;
    task: FirebaseTask;
}

export type FirebaseProjects = Record<string, FirebaseProject>;
export type FirebaseMembers = Record<string, FirebaseMember>;
export type FirebaseTasks = Record<string, FirebaseTask>;
export type FirebaseArchives = Record<string, FirebaseArchive>;

