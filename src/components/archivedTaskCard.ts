// Skapar ett kort för en arkiverad uppgift som visas på arkivsidan

import type { ArchivedTask } from "../types/types"

export function createArchivedTaskCard(archive: ArchivedTask, projectName: string, memberName: string){
    const task = archive.task

    // Samma klass som projektkortet så att de ser likadana ut
    const archivedTaskCard = document.createElement('article')
    archivedTaskCard.classList.add('projectCard')

    const createdDate = new Date(task.createdAt).toLocaleDateString()
    const completedDate = task.completedAt ? new Date(task.completedAt).toLocaleDateString() : '-'

    archivedTaskCard.innerHTML = `
      <div class="projectLinkDiv">
        <h3 id="boldH3">${task.title}</h3>
        <p><b id="bold">Project: </b>${projectName}</p>
        <p><b id="bold">Task Description:</b></p>
        <p class="descriptionDiv">${task.description}</p>
        <p><b id="bold">Category: </b>${task.category}</p>
        <p><b id="bold">Created: </b>${createdDate}</p>
        <p><b id="bold">Completed: </b>${completedDate}</p>
        <p><b id="bold">Deadline: </b>${task.deadline}</p>
        <p><b id="bold">Completed by: </b>${memberName}</p>
      </div>
    `
    return archivedTaskCard
}
