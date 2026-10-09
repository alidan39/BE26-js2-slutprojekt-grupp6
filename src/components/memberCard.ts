import type { Member} from "../types/types";

export function createMemberCard(member: Member){
    const memberCard = document.createElement('article')
    memberCard.classList.add('memberCard')

    /*const memberProjects = projects.filter(project =>project.memberIds.includes(member.id))*/

    memberCard.innerHTML = `
      <h3>${member.name}</h3>
      <p><b id="bold">Category: </b>${member.category}</p>
      <p>Active Projects: ${member.activeTasks}</p> // titel // koppla ihop activeProjects
      <p>TotalProjects: </p>
    `
    return memberCard
}