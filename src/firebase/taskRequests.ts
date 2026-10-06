import { BASE_URL } from './config.ts';
import { addTaskToProject } from './projectRequests.ts';
import { Task } from '../classes/Task.ts';
import type { FirebaseTask, FirebaseTasks } from '../types/types.ts';

// Hämtar alla uppgifter och gör om dem till en array med id inkluderat
export async function getTasks(): Promise<Task[]> {
    const response = await fetch(`${BASE_URL}/tasks.json`);

    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }

    const data: FirebaseTasks | null = await response.json();
    const tasks: Task[] = [];

    if (!data) return tasks;

    for (const id in data) {
       tasks.push(new Task(id, data[id]));
}
    return tasks;
}

// Skapar en ny uppgift och kopplar den till projektet. Returnerar det nya id:t
export async function postTask(newTask: FirebaseTask, projectId: string): Promise<string> {
    const options = {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
            'Content-type': 'application/json'
        }
    };

    const response = await fetch(`${BASE_URL}/tasks.json`, options);

    if (!response.ok) {
        throw new Error('Failed to create task');
    }

    const data: { name: string } = await response.json();
    const newTaskId = data.name;

    await addTaskToProject(projectId, newTaskId);

    return newTaskId;
}