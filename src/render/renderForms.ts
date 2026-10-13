import {getMembers, postMember} from "../firebase/memberRequests.ts"
import type { Category } from "../types/types.ts"
import {getProjects, postProject} from "../firebase/projectRequests.ts"
import { createMemberCard } from "../components/memberCard.ts"
import { createProjectCard } from "../components/projectCard.ts"

const projectForm = document.querySelector('#newProjectForm') as HTMLFormElement
const memberForm = document.querySelector('#newMemberForm') as HTMLFormElement

const pName = document.querySelector('#pName') as HTMLInputElement
const desDiv = document.querySelector('#desDiv') as HTMLTextAreaElement
const deadline = document.querySelector('#deadline') as HTMLInputElement
const addMemberWrapper = document.querySelector('#addMemberWrapper') as HTMLDivElement

const mName = document.querySelector('#mName') as HTMLInputElement

const projectError = document.querySelector('#projectError') as HTMLParagraphElement
const memberError = document.querySelector('#memberError') as HTMLParagraphElement


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

    if(!pName.value.trim()) {
        alert('Please give the project a name to continue!')
        return
    }

    //Checkboxes för members
    const checkedMembers = document.querySelectorAll('#addMembersWrapper input:checked')
    const memberIds = Array.from(checkedMembers).map(checkbox => (checkbox as HTMLInputElement).value)

    const newProject = {
        name: pName.value,
        description: desDiv.value,
        deadline: deadline.value,
        memberIds: memberIds
    }

    try {

        projectError.style.display = 'none'
        projectError.innerText = ''

        await postProject(newProject)
        //await renderAllProjects()
        projectForm.reset()

        console.log(`
        --------------------------------------
        ${newProject.name} has been added succesfully!
        --------------------------------------
        `)
    }

    catch(error) {
        projectError.style.display = 'block'
        projectError.textContent = "Could not create a Project at the moment, please try again later!"
        console.error(error)
    }

})

export async function renderAllProjects() {
    const allProjectsWrapper = document.querySelector('#allProjectsWrapper')

    if (!allProjectsWrapper){
        //console.error('allProjectsWrapper could not be found')
        return
    }

    allProjectsWrapper.innerHTML = ''

    try {
        const allProjects = await getProjects()

        //Loopa igenom varje member card
        allProjects.forEach(project => {
          const pCard = createProjectCard(project)
          allProjectsWrapper.appendChild(pCard)
        })
    }
    catch(error) {
        allProjectsWrapper.innerHTML = `
        <p class="error">
            Could not load Projects at the moment, please try again later!
        </p>
        `

        console.error(error)
    }
}

memberForm?.addEventListener('submit', async (event) => {
    event.preventDefault()

    if(!mName.value.trim()) {
        alert('Please give the member a name to continue!')
        return
    }
        
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

    try {

        memberError.style.display = 'none'
        memberError.innerText = ''

        await postMember(newMember)
        await renderAllMembers()
        memberForm.reset()

        console.log(`
          --------------------------------------
          New member added succesfully!
          ${newMember.name} welcome to the team!
          --------------------------------------
        `)
    
    }
    catch(error) {
        memberError.style.display = 'block'
        memberError.textContent = "Could not create a Member at the moment, please try again later!"
        console.error(error)
    }

})

//Rendera allmembers
export async function renderAllMembers() {

    const allMembersWrapper = document.querySelector('#allMembersWrapper')

    if (!allMembersWrapper) {
        //console.error('allMembersWrapper could not be found')
        return
    }

    allMembersWrapper.innerHTML = ''

    try {
        const allMembers = await getMembers()
        const allProjects = await getProjects()

        //Loopa igenom varje member card + total projects for members
        allMembers.forEach(member => {
          const totalProjects = allProjects.filter(project =>project.memberIds.includes(member.id)).length
          const mCard = createMemberCard(member, totalProjects)
        
          allMembersWrapper.appendChild(mCard)
        })
    }
    catch(error) {
        allMembersWrapper.innerHTML = `
        <p class="error">
            Could not load Members at the moment, please try again later!
        </p>
        `

        console.error(error)
    }
}

