const newProjectBtn = document.getElementById('newProjectBtn')
const newProjectWrapper = document.getElementById('newProjectWrapper')
const closeProjectBtn = document.getElementById('closeProjectBtn')

const newMemberBtn = document.getElementById('newMemberBtn')
const newMemberWrapper = document.getElementById('newMemberWrapper')
const closeMemberBtn = document.getElementById('closeMemberBtn')

newProjectBtn.addEventListener('click', () => {
    newProjectWrapper.style.display = 'flex'
})

closeProjectBtn.addEventListener('click', () => {
    newProjectWrapper.style.display = 'none'
})

newMemberBtn.addEventListener('click', () => {
    newMemberWrapper.style.display = 'flex'
})

closeMemberBtn.addEventListener('click', () => {
    newMemberWrapper.style.display = 'none'
})
