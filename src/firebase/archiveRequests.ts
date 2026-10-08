import { BASE_URL } from './config.ts';
import type { ArchivedTask, FirebaseArchives } from '../types/types.ts';

// Hämtar alla arkiverade uppgifter och gör om dem till en array med id inkluderat
export async function getArchives(): Promise<ArchivedTask[]> {
    const response = await fetch(`${BASE_URL}/archives.json`);

    if (!response.ok) {
        throw new Error('Failed to fetch archives');
    }

    const data: FirebaseArchives | null = await response.json();
    const archives: ArchivedTask[] = [];

    if (!data) return archives;

    for (const id in data) {
        archives.push({
            id: id,
            projectId: data[id].projectId,
            task: data[id].task
        });
    }

    return archives;
}