import { getTasks } from '../firebase/taskRequests.ts'

const newGrid = document.querySelector('#newGrid') as HTMLDivElement
const inProgressGrid = document.querySelector('#inProgressGrid') as HTMLDivElement
const doneGrid = document.querySelector('#doneGrid') as HTMLDivElement

export async function renderTaskGrid(){
    
    try {
      const tasks = await getTasks()

      const newTasks = tasks.filter(task => task.taskStatus === 'new')
      const inProgressTasks = tasks.filter(task => task.taskStatus === 'in-progress')
      const doneTasks = tasks.filter(task => task.taskStatus === 'done')

      newGrid.textContent = String(newTasks.length)
      inProgressGrid.textContent = String(inProgressTasks.length)
      doneGrid.textContent = String(doneTasks.length)
    }
    catch(error) {
        alert('Could not load Tasks at the moment, please try again later!')
        return
    }
}