import { BASE_URL } from './config';
import type { Member, FirebaseMembers } from '../types/types';

// Hämtar alla medlemmar och gör om dem till en array med id inkluderat
export async function getMembers(): Promise<Member[]> {
    const response = await fetch(`${BASE_URL}/members.json`);

    if (!response.ok) {
        throw new Error('Kunde inte hämta medlemmar');
    }

    const data: FirebaseMembers | null = await response.json();
    const members: Member[] = [];

    if (!data) return members;

    for (const id in data) {
        members.push({
            id: id,
            name: data[id].name,
            category: data[id].category,
            activeTasks: data[id].activeTasks
        });
    }

    return members;
}
