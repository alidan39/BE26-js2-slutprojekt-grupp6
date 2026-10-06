import { BASE_URL } from './config';
import type { Project, FirebaseProject, FirebaseProjects } from '../types/types';

// Hämtar alla projekt och gör om dem till en array med id inkluderat
export async function getProjects(): Promise<Project[]> {
    const response = await fetch(`${BASE_URL}/projects.json`);

    if (!response.ok) {
        throw new Error('Kunde inte hämta projekt');
    }

    const data: FirebaseProjects | null = await response.json();
    const projects: Project[] = [];

    if (!data) return projects;

    for (const id in data) {
        projects.push({
            id: id,
            name: data[id].name,
            description: data[id].description,
            deadline: data[id].deadline,
            // Tomma arrayer sparas inte i Firebase, så de kan saknas
            memberIds: data[id].memberIds || [],
            taskIds: data[id].taskIds || []
        });
    }

    return projects;
}

// Skapar ett nytt projekt i Firebase och returnerar det nya id:t
export async function postProject(newProject: FirebaseProject): Promise<string> {
    const options = {
        method: 'POST',
        body: JSON.stringify(newProject),
        headers: {
            'Content-type': 'application/json'
        }
    };

    const response = await fetch(`${BASE_URL}/projects.json`, options);

    if (!response.ok) {
        throw new Error('Kunde inte skapa projekt');
    }

    // Firebase svarar med { name: "<nytt id>" }
    const data: { name: string } = await response.json();
    return data.name;
}

// Lägger till en uppgifts id i projektets taskIds
export async function addTaskToProject(projectId: string, taskId: string): Promise<void> {
    // Hämta projektets nuvarande taskIds
    const getResponse = await fetch(`${BASE_URL}/projects/${projectId}/taskIds.json`);

    if (!getResponse.ok) {
        throw new Error('Kunde inte hämta projektets uppgifter');
    }

    // null om projektet inte har några uppgifter än
    const taskIds: string[] | null = await getResponse.json();
    const updatedTaskIds = [...(taskIds || []), taskId];

    // PUT ersätter hela arrayen, POST hade skapat ett Firebase-id och förstört arrayen
    const options = {
        method: 'PUT',
        body: JSON.stringify(updatedTaskIds),
        headers: {
            'Content-type': 'application/json'
        }
    };

    const putResponse = await fetch(`${BASE_URL}/projects/${projectId}/taskIds.json`, options);

    if (!putResponse.ok) {
        throw new Error('Kunde inte lägga till uppgiften i projektet');
    }
}