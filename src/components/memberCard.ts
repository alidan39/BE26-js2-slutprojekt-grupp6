import type { Member } from "../types/types";

export function createMemberCard(member: Member){
    const memberCard = document.createElement('article')
    memberCard.classList.add('memberCard')

    memberCard.innerHTML = `
      <h3>${member.name}</h3>
      <p>Category: </p>${member.category}
      <p>Active Projects: </p> // titel
      <p>TotalProjects: </p>${member.activeTasks}
    `
    return memberCard
}