import { BASE_URL } from './config';
import type { Task, FirebaseTasks } from '../types/types';

// Hämtar alla uppgifter och gör om dem till en array med id inkluderat
export async function getTasks(): Promise<Task[]> {
    const response = await fetch(`${BASE_URL}/tasks.json`);

    if (!response.ok) {
        throw new Error('Kunde inte hämta uppgifter');
    }

    const data: FirebaseTasks | null = await response.json();
    const tasks: Task[] = [];

    if (!data) return tasks;

    for (const id in data) {
        tasks.push({
            id: id,
            title: data[id].title,
            description: data[id].description,
            category: data[id].category,
            taskStatus: data[id].taskStatus,
            priority: data[id].priority,
            deadline: data[id].deadline,
            createdAt: data[id].createdAt,
            memberId: data[id].memberId,       
            completedAt: data[id].completedAt  
        });
    }

    return tasks;
}