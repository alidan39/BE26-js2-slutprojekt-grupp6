import { BASE_URL } from './config.ts';
import type { Member, FirebaseMember, FirebaseMembers } from '../types/types.ts';

// Hämtar alla medlemmar och gör om dem till en array med id inkluderat
export async function getMembers(): Promise<Member[]> {
    const response = await fetch(`${BASE_URL}/members.json`);

    if (!response.ok) {
        throw new Error('Failed to fetch members');
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

// Skapar en ny medlem i Firebase och returnerar det nya id:t
export async function postMember(newMember: FirebaseMember): Promise<string> {
    const options = {
        method: 'POST',
        body: JSON.stringify(newMember),
        headers: {
            'Content-type': 'application/json'
        }
    };

    const response = await fetch(`${BASE_URL}/members.json`, options);

    if (!response.ok) {
        throw new Error('Failed to create member');
    }

    // Firebase svarar med { name: "<nytt id>" }
    const data: { name: string } = await response.json();
    return data.name;
}

// Ändrar medlemmens activeTasks med change (1 eller -1)
export async function updateActiveTasks(memberId: string, change: number): Promise<void> {
    // Hämta medlemmens nuvarande antal
    const getResponse = await fetch(`${BASE_URL}/members/${memberId}/activeTasks.json`);

    if (!getResponse.ok) {
        throw new Error('Failed to fetch active tasks');
    }

    // null om fältet saknas
    const activeTasks: number | null = await getResponse.json();

    // PATCH ändrar bara activeTasks, resten av medlemmen lämnas orörd
    const options = {
        method: 'PATCH',
        body: JSON.stringify({ activeTasks: (activeTasks || 0) + change }),
        headers: {
            'Content-type': 'application/json'
        }
    };

    const patchResponse = await fetch(`${BASE_URL}/members/${memberId}.json`, options);

    if (!patchResponse.ok) {
        throw new Error('Failed to update active tasks');
    }
}
