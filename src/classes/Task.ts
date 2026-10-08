import type { Category, TaskStatus, Priority, FirebaseTask, FirebaseArchive } from '../types/types.ts';
import { BASE_URL } from '../firebase/config.ts';
import { removeTaskFromProject } from '../firebase/projectRequests.ts';
import { updateActiveTasks } from '../firebase/memberRequests.ts';

// En instans = en uppgift. Id:t gör att den senare kan ändra och radera sig själv i Firebase
export class Task {
    public readonly id: string;
    public readonly title: string;
    public readonly description: string;
    public readonly category: Category;
    public readonly createdAt: number;
    public taskStatus: TaskStatus;
    public priority: Priority;
    public deadline: string;
    public memberId?: string;
    public completedAt?: number;

    constructor(id: string, data: FirebaseTask) {
        this.id = id;
        this.title = data.title;
        this.description = data.description;
        this.category = data.category;
        this.createdAt = data.createdAt;
        this.taskStatus = data.taskStatus;
        this.priority = data.priority;
        this.deadline = data.deadline;
        this.memberId = data.memberId;
        this.completedAt = data.completedAt;
    }

    async updateDeadline(newDeadline: string): Promise<void> {
        const options = {
            method: 'PATCH',
            body: JSON.stringify({ deadline: newDeadline }),
            headers: {
                'Content-type': 'application/json'
            }
        };

        const response = await fetch(`${BASE_URL}/tasks/${this.id}.json`, options);

        if (!response.ok) {
            throw new Error('Failed to update deadline');
        }

        this.deadline = newDeadline;
    }

    async updatePriority(newPriority: Priority): Promise<void> {
        const options = {
            method: 'PATCH',
            body: JSON.stringify({ priority: newPriority }),
            headers: {
                'Content-type': 'application/json'
            }
        };

        const response = await fetch(`${BASE_URL}/tasks/${this.id}.json`, options);

        if (!response.ok) {
            throw new Error('Failed to update priority');
        }

        this.priority = newPriority;
    }

    // Tilldelar uppgiften en medlem och flyttar den till in-progress
    async assignMember(memberId: string): Promise<void> {
        if (this.taskStatus === 'done') {
            throw new Error('Cannot assign a completed task');
        }

        const previousMemberId = this.memberId;

        const options = {
            method: 'PATCH',
            body: JSON.stringify({ memberId: memberId, taskStatus: 'in-progress' }),
            headers: {
                'Content-type': 'application/json'
            }
        };

        const response = await fetch(`${BASE_URL}/tasks/${this.id}.json`, options);

        if (!response.ok) {
            throw new Error('Failed to assign member');
        }

        this.memberId = memberId;
        this.taskStatus = 'in-progress';

        // Samma medlem igen, då ändras inte antalet
        if (previousMemberId === memberId) return;

        // Byts medlem har den förra en aktiv uppgift mindre
        if (previousMemberId) {
            await updateActiveTasks(previousMemberId, -1);
        }

        await updateActiveTasks(memberId, 1);
    }

    // Markerar uppgiften som klar och sparar när den blev klar
    async complete(): Promise<void> {
        if (this.taskStatus === 'done') {
            throw new Error('Task is already completed');
        }

        const completedAt = Date.now();

        const options = {
            method: 'PATCH',
            body: JSON.stringify({ taskStatus: 'done', completedAt: completedAt }),
            headers: {
                'Content-type': 'application/json'
            }
        };

        const response = await fetch(`${BASE_URL}/tasks/${this.id}.json`, options);

        if (!response.ok) {
            throw new Error('Failed to complete task');
        }

        this.taskStatus = 'done';
        this.completedAt = completedAt;

        // Uppgiften räknas inte längre som aktiv för medlemmen
        if (this.memberId) {
            await updateActiveTasks(this.memberId, -1);
        }
    }

    async archive(projectId: string): Promise<void> {
        const archivedTask: FirebaseArchive = {
            projectId: projectId,
            task: {
                title: this.title,
                description: this.description,
                category: this.category,
                taskStatus: this.taskStatus,
                priority: this.priority,
                deadline: this.deadline,
                createdAt: this.createdAt,
                memberId: this.memberId,
                completedAt: this.completedAt
            }
        };

        // 1. Kopiera till archives först, så att uppgiften aldrig försvinner helt
        const putOptions = {
            method: 'PUT',
            body: JSON.stringify(archivedTask),
            headers: {
                'Content-type': 'application/json'
            }
        };

        const putResponse = await fetch(`${BASE_URL}/archives/${this.id}.json`, putOptions);

        if (!putResponse.ok) {
            throw new Error('Failed to archive task');
        }

        // 2. Ta bort från tasks
        const deleteResponse = await fetch(`${BASE_URL}/tasks/${this.id}.json`, { method: 'DELETE' });

        if (!deleteResponse.ok) {
            throw new Error('Failed to delete task');
        }

        // 3. Ta bort id:t från projektets taskIds
        await removeTaskFromProject(projectId, this.id);
    }
}

