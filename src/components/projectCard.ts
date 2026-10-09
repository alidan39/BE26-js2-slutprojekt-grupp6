import type { Project } from "../types/types"

export function createProjectCard(project: Project){
    const projectCard = document.createElement('article')
    projectCard.classList.add('projectCard')

    projectCard.innerHTML = `
      <a class="projectLinkDiv" href="project.html?id=${project.id}">
        <h3 id="boldH3">${project.name}</h3>
        <p><b id="bold">Amount of Members: </b>${project.memberIds.length}</p>
        <p><b id="bold">Project Description:</b></p>
        <p class="descriptionDiv">${project.description}</p>
        <p><b id="bold">Deadline: </b>${project.deadline}</p>
      </a> 
    `
    return projectCard
}