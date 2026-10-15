// verifieying members, task count and render project and member forms
import {getMembers, postMember} from "../firebase/memberRequests.ts"
import type { Category, Project } from "../types/types.ts"
import {getProjects, postProject} from "../firebase/projectRequests.ts"
import { getTasks } from "../firebase/taskRequests.ts"
import type { Task } from "../classes/Task.ts"
import { createMemberCard } from "../components/memberCard.ts"
import { createProjectCard } from "../components/projectCard.ts"
import { getArchives } from "../firebase/archiveRequests.ts"
import { createArchivedTaskCard } from "../components/archivedTaskCard.ts"

const projectForm = document.querySelector('#newProjectForm') as HTMLFormElement
const memberForm = document.querySelector('#newMemberForm') as HTMLFormElement

const pName = document.querySelector('#pName') as HTMLInputElement
const desDiv = document.querySelector('#desDiv') as HTMLTextAreaElement
const deadline = document.querySelector('#deadline') as HTMLInputElement
const addMemberWrapper = document.querySelector('#addMemberWrapper') as HTMLDivElement

const mName = document.querySelector('#mName') as HTMLInputElement

const projectError = document.querySelector('#projectError') as HTMLParagraphElement
const memberError = document.querySelector('#memberError') as HTMLParagraphElement

function countActiveTasks(project: Project, tasks: Task[]) {
    return tasks.filter(task => project.taskIds.includes(task.id) && task.taskStatus === 'in-progress').length
}

export async function renderMemberOptions() {

    const members = await getMembers()

    addMemberWrapper.innerHTML = ''

    members.forEach(member => {
        const label = document.createElement('label')
        label.innerHTML = `
          <input type="checkbox" value="${member.id}">
          ${member.name}
          <br>
          <small><em>(${member.category})</em></small>
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

    const checkedMembers = document.querySelectorAll('#addMemberWrapper input:checked')
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
        return
    }

    allProjectsWrapper.innerHTML = ''

    try {
        const allProjects = await getProjects()
        const allTasks = await getTasks()
        const activeProjects = allProjects.filter(project => !project.archived)

        activeProjects.forEach(project => {
          const pCard = createProjectCard(project, countActiveTasks(project, allTasks))
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

    const category = selectedCategory.value as Category

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

export async function renderAllMembers() {

    const allMembersWrapper = document.querySelector('#allMembersWrapper')

    if (!allMembersWrapper) {
        return
    }

    allMembersWrapper.innerHTML = ''

    try {
        const allMembers = await getMembers()
        const allProjects = await getProjects()
        const activeProjects = allProjects.filter(project => !project.archived)

        allMembers.forEach(member => {
          const projectNames = activeProjects
            .filter(project => project.memberIds.includes(member.id))
            .map(project => project.name)
          const mCard = createMemberCard(member, projectNames)
        
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

export async function renderArchivedProjects() {
    const archivedProjectsWrapper = document.querySelector('#archivedProjectsWrapper')

    if (!archivedProjectsWrapper) return

    const allProjects = await getProjects()
    const allTasks = await getTasks()
    const archivedProjects = allProjects.filter(project => project.archived)

    archivedProjects.forEach(project => {
        const pCard = createProjectCard(project, countActiveTasks(project, allTasks))
        archivedProjectsWrapper.appendChild(pCard)
    })
}

export async function renderArchivedTasks() {
    const archivedTasksWrapper = document.querySelector('#archivedTasksWrapper')

    if (!archivedTasksWrapper) return

    const archives = await getArchives()
    const allProjects = await getProjects()
    const allMembers = await getMembers()

    archives.forEach(archive => {
        const project = allProjects.find(project => project.id === archive.projectId)
        const member = allMembers.find(member => member.id === archive.task.memberId)

        const projectName = project ? project.name : 'Unknown project'
        const memberName = member ? member.name : 'No member'

        const aCard = createArchivedTaskCard(archive, projectName, memberName)
        archivedTasksWrapper.appendChild(aCard)
    })
}

