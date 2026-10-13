import type { Member} from "../types/types";

export function createMemberCard(member: Member, totalProjects: number){
    const memberCard = document.createElement('article')
    memberCard.classList.add('memberCard')

    memberCard.innerHTML = `
      <h3>${member.name}</h3>
      <p><b id="bold">Category: </b>${member.category}</p>
      <p><b id="bold">Active Tasks:</b> ${member.activeTasks}</p> 
      <p><b id="bold">Total projects:</b> ${totalProjects}</p>
    `
    return memberCard
}