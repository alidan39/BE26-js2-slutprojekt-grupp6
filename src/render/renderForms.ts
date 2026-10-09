import {getMembers, postMember} from "../firebase/memberRequests.ts"
import type { Project, Member, Category } from "../types/types.ts"
import {getProjects, postProject} from "../firebase/projectRequests.ts"
import { createMemberCard } from "../components/memberCard.ts"
import { createProjectCard } from "../components/projectCard.ts"

const projectForm = document.querySelector('#newProjectForm')
const memberForm = document.querySelector('#newMemberForm')

const pName = document.querySelector('#pName') as HTMLInputElement
const desDiv = document.querySelector('#desDiv') as HTMLTextAreaElement
const deadline = document.querySelector('#deadline') as HTMLInputElement
const addMemberWrapper = document.querySelector('#addMemberWrapper') as HTMLDivElement

const mName = document.querySelector('#mName') as HTMLInputElement


// verifiuerad medlem som ska kunna väljas i options
export async function renderMemberOptions() {

    const members = await getMembers()

    addMemberWrapper.innerHTML = ''

    members.forEach(member => {
        const label = document.createElement('label')
        label.innerHTML = `
          <input type="checkbox" value="${member.id}">
          ${member.name}
        `
        addMemberWrapper.appendChild(label)
    }
    
)}

projectForm?.addEventListener('submit', async (event) => {
    event.preventDefault()

    //Checkboxes för members
    const checkedMembers = document.querySelectorAll('#addMembersWrapper input:checked')
    const memberIds = Array.from(checkedMembers).map(checkbox => (checkbox as HTMLInputElement).value)

    const newProject = {
        name: pName.value,
        description: desDiv.value,
        deadline: deadline.value,
        memberIds: memberIds
    }

    await postProject(newProject)
    //await renderAllProjects()

    console.log(`
        --------------------------------------
        ${newProject.name} has been added succesfully!
        --------------------------------------
       `)
    
})

export async function renderAllProjects() {
    const allProjectsWrapper = document.querySelector('#allProjectsWrapper')

    if (!allProjectsWrapper) return

    const allProjects = await getProjects()

    //Loopa igenom varje member card
    allProjects.forEach(project => {
        const pCard = createProjectCard(project)
        allProjectsWrapper.appendChild(pCard)
    })
}

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
    await renderAllMembers()
    console.log(`
          --------------------------------------
          New member added succesfully!
          ${newMember.name} welcome to the team!
          --------------------------------------
    `)

    memberForm.innerHTML = ''
})

//Rendera allmembers
export async function renderAllMembers() {

    const allMembersWrapper = document.querySelector('#allMembersWrapper')

    if (!allMembersWrapper) return

    const allMembers = await getMembers()

    //Loopa igenom varje member card
    allMembers.forEach(member => {
        const mCard = createMemberCard(member)
        allMembersWrapper.appendChild(mCard)
    })
}

