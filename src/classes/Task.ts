import type { Category, TaskStatus, Priority, FirebaseTask } from '../types/types.ts';
import { BASE_URL } from '../firebase/config.ts';
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
            throw new Error('Kunde inte ändra deadline');
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
            throw new Error('Kunde inte ändra priority');
        }

        this.priority = newPriority;
    }
}

