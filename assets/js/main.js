const bot = document.querySelector('.bott');
bot.addEventListener('click',() =>{
    const remove = document.querySelector('.add');
    remove.classList.remove('hidden');
});
const addTask = document.querySelector('.addTask');
addTask.addEventListener('click', ()=>{
    const hiden = document.querySelector('.add')
    hiden.classList.add('hidden')
});


