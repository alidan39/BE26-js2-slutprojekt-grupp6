import { BASE_URL } from './config';
import type { Project, FirebaseProjects } from '../types/types';

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
            memberIds: data[id].memberIds ?? [],
            taskIds: data[id].taskIds ?? []
        });
    }

    return projects;
}