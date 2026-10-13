import type { Member} from "../types/types";

export function createMemberCard(member: Member, projectNames: string[]){
    const memberCard = document.createElement('article')
    memberCard.classList.add('memberCard')

    const projects = projectNames.length > 0 ? projectNames.join(', ') : 'No projects'

    memberCard.innerHTML = `
      <h3>${member.name}</h3>
      <p><b id="bold">Category: </b>${member.category}</p>
      <p><b id="bold">Active Tasks: </b>${member.activeTasks}</p>
      <p><b id="bold">Projects: </b>${projects}</p>
    `
    return memberCard
}