// Render status of tasks to index.html
import { getTasks } from '../firebase/taskRequests.ts'
import { getProjects } from '../firebase/projectRequests.ts'

const newGrid = document.querySelector('#newGrid') as HTMLDivElement
const inProgressGrid = document.querySelector('#inProgressGrid') as HTMLDivElement
const doneGrid = document.querySelector('#doneGrid') as HTMLDivElement

export async function renderTaskGrid(){

    if (!newGrid || !inProgressGrid || !doneGrid) return

    try {
      const tasks = await getTasks()
      const projects = await getProjects()

      const activeProjects = projects.filter(project => !project.archived)
      const activeTasks = tasks.filter(task =>
        activeProjects.some(project => project.taskIds.includes(task.id))
      )

      const newTasks = activeTasks.filter(task => task.taskStatus === 'new')
      const inProgressTasks = activeTasks.filter(task => task.taskStatus === 'in-progress')
      const doneTasks = activeTasks.filter(task => task.taskStatus === 'done')

      newGrid.textContent = String(newTasks.length)
      inProgressGrid.textContent = String(inProgressTasks.length)
      doneGrid.textContent = String(doneTasks.length)
    }
    catch(error) {
        alert('Could not load Tasks at the moment, please try again later!')
        return
    }
}