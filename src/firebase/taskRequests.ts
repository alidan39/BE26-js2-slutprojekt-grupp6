import { BASE_URL } from './config';
import { addTaskToProject } from './projectRequests';
import type { Task, FirebaseTask, FirebaseTasks } from '../types/types';

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
        throw new Error('Kunde inte skapa uppgift');
    }

    const data: { name: string } = await response.json();
    const newTaskId = data.name;

    await addTaskToProject(projectId, newTaskId);

    return newTaskId;
}