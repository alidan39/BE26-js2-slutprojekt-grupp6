import { BASE_URL } from './config.ts';
import type { Project, FirebaseProject, FirebaseProjects } from '../types/types.ts';

// Hämtar alla projekt och gör om dem till en array med id inkluderat
export async function getProjects(): Promise<Project[]> {
    const response = await fetch(`${BASE_URL}/projects.json`);

    if (!response.ok) {
        throw new Error('Failed to fetch projects');
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
            taskIds: data[id].taskIds || [],
            // Saknas på projekt som aldrig arkiverats
            archived: data[id].archived || false
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
        throw new Error('Failed to create project');
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
        throw new Error('Failed to fetch project tasks');
    }

    // null om projektet inte har några uppgifter än
    const taskIds: string[] | null = await getResponse.json();
    const updatedTaskIds = [...(taskIds || []), taskId]; //kopierar alla gamla id och lägger till nya sist

    // PUT ersätter hela arrayen, POST skapar ett Firebase-id som förstör arrayen
    const options = {
        method: 'PUT',
        body: JSON.stringify(updatedTaskIds),
        headers: {
            'Content-type': 'application/json'
        }
    };

    const putResponse = await fetch(`${BASE_URL}/projects/${projectId}/taskIds.json`, options);

    if (!putResponse.ok) {
        throw new Error('Failed to add task to project');
    }
}

// Tar bort en uppgifts id från projektets taskIds
export async function removeTaskFromProject(projectId: string, taskId: string): Promise<void> {
    // Hämta projektets nuvarande taskIds
    const getResponse = await fetch(`${BASE_URL}/projects/${projectId}/taskIds.json`);

    if (!getResponse.ok) {
        throw new Error('Failed to fetch project tasks');
    }

    // null om projektet inte har några uppgifter
    const taskIds: string[] | null = await getResponse.json();
    const updatedTaskIds = (taskIds || []).filter(id => id !== taskId);

    // PUT ersätter hela arrayen med den nya utan det borttagna id:t
    const options = {
        method: 'PUT',
        body: JSON.stringify(updatedTaskIds),
        headers: {
            'Content-type': 'application/json'
        }
    };

    const putResponse = await fetch(`${BASE_URL}/projects/${projectId}/taskIds.json`, options);

    if (!putResponse.ok) {
        throw new Error('Failed to remove task from project');
    }
}

// Markerar ett projekt som arkiverat. Projektet och dess uppgifter ligger kvar
export async function archiveProject(projectId: string): Promise<void> {
    // PATCH ändrar bara archived, PUT hade ersatt hela projektet
    const options = {
        method: 'PATCH',
        body: JSON.stringify({ archived: true }),
        headers: {
            'Content-type': 'application/json'
        }
    };

    const response = await fetch(`${BASE_URL}/projects/${projectId}.json`, options);

    if (!response.ok) {
        throw new Error('Failed to archive project');
    }
}
