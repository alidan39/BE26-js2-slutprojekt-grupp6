import { Project } from "../types/types"

export function createProjectCard(project: Project){
    const projectCard = document.createElement('article')

    projectCard.innerHTML = `
      <a class="projectLinkDiv" href="project.html?id=${project.id}">
        <h3>${project.name}</h3>
        <p>${project.memberIds.length}</p>
        <p>${project.description}</p>
        <p>${project.deadline}</p>
      </a> 
    `
    return projectCard
}