import {getMembers, postMember} from "./firebase/memberRequests.ts"
import type { Project, Member, Category } from "../types/types.ts"
import {getProjects, postProject} from "./firebase/projectRequests.ts"

const newProjectBtn = document.querySelector('#newProjectBtn') as HTMLButtonElement
const newProjectWrapper = document.querySelector('#newProjectWrapper') as HTMLDivElement
const closeProjectBtn = document.querySelector('#closeProjectBtn')

const newMemberBtn = document.querySelector('#newMemberBtn') as HTMLButtonElement
const newMemberWrapper = document.querySelector('#newMemberWrapper') as HTMLDivElement
const closeMemberBtn = document.querySelector('#closeMemberBtn')

const projectForm = document.querySelector('#newProjectForm')
const memberForm = document.querySelector('#newMemberForm')

const pName = document.querySelector('#pName') as HTMLInputElement
const desDiv = document.querySelector('#desDiv') as HTMLTextAreaElement
const deadline = document.querySelector('#deadline') as HTMLInputElement

const mName = document.querySelector('#mName') as HTMLInputElement
const allMembersWrapper = document.querySelector('#allMembersWrapper') as htmlSectionElement

newProjectBtn?.addEventListener('click', () => {
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

projectForm?.addEventListener('submit', (event) => {
    event.preventDefault()

    const newProject = {
      name: pName.value,
      description: desDiv.value,
      deadline: deadline.value  
    }
    console.log('ADDED PROJECT')
    projectForm.reset()
})

memberForm?.addEventListener('submit', async (event) => {
    event.preventDefault()

    const selectedCategory = document.querySelector('input[name="category"]:checked') as HTMLInputElement
    if(!selectedCategory) {
        alert('Please choose a Catagory') 
        return
    }

    const category = selectedCategory.value as Category // Interface

    const newMember = {
        name: mName.value,
        category: category,
        activeTasks: 0
    }

    await postMember(newMember)
    console.log(`
          --------------------------------------
          New member added succesfully!
          ${newMember.name} welcome to the team!
          --------------------------------------
    `)

    const allMembers = await getMembers()
    allMembersWrapper.appendChild(allMembers)
    //Hämta om alla medlemmar på submit
    //const members = await getMembers()
    //createMemberCard(newMember)

    memberForm.reset()
})
