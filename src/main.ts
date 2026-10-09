import "./pages/project";
import {getMembers, postMember} from "./firebase/memberRequests.ts"
import {getProjects, postProject} from "./firebase/projectRequests.ts"
import { createMemberCard } from "./components/memberCard.ts"
import "./render/renderForms.ts"
import { renderAllMembers, renderAllProjects, renderMemberOptions } from "./render/renderForms.ts"

const newProjectBtn = document.querySelector('#newProjectBtn') as HTMLButtonElement
const newProjectWrapper = document.querySelector('#newProjectWrapper') as HTMLDivElement
const closeProjectBtn = document.querySelector('#closeProjectBtn')

const newMemberBtn = document.querySelector('#newMemberBtn') as HTMLButtonElement
const newMemberWrapper = document.querySelector('#newMemberWrapper') as HTMLDivElement
const closeMemberBtn = document.querySelector('#closeMemberBtn')

newProjectBtn?.addEventListener('click', async () => {
    await renderMemberOptions()
    newProjectWrapper.style.display = 'flex'
})

closeProjectBtn?.addEventListener('click', () => {
    newProjectWrapper.style.display = 'none'
})

newMemberBtn?.addEventListener('click', () => {
    newMemberWrapper.style.display = 'flex'
})

closeMemberBtn?.addEventListener('click', () => {
    newMemberWrapper.style.display = 'none'
})

renderAllMembers()
renderAllProjects()