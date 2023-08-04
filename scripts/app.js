const form = document.getElementById("form")
const input = document.getElementById("input")
const plusButton = document.getElementById("plusButton")
const listDiv = document.getElementById("list")
const deleteButton = document.querySelectorAll(".deleteButton")

form.addEventListener("submit", submitForm)
plusButton.addEventListener("click", submitForm)

const savingTodoJSON = localStorage.getItem("todos")
const savingTodo =  savingTodoJSON ? JSON.parse(savingTodoJSON) : [];

for (const todo of savingTodo) {
    addTodoToList(todo)
}

function submitForm(e) {
    e.preventDefault()
    if (input.value.trim() == "") {
        alert("Boş karakter giremezsiniz !")
        return
    }
    else {
        console.log(input.value.trim())
    }

    const todo = {
        id: Date.now(),
        text: input.value.trim(),
        completed: false
    }
    savingTodo.push(todo)
    localStorage.setItem("todos", JSON.stringify(savingTodo))
    addTodoToList(todo)
    input.value = ""
}

function addTodoToList(todo) {
    const div = document.createElement("div")
    div.classList.add("flex","items-center","justify-between","border-b-2","py-4","m-auto","w-full")
    div.setAttribute("id",todo.id)
    div.innerHTML = `
            <span class="inputValue overflow-hidden whitespace-nowrap overflow-ellipsis ease-in duration-300">${todo.text}</span>
            <div>
                <i onclick="handleClick(${todo.id})" class="okButton fa-solid fa-check p-1 bg-blue-500 text-white cursor-pointer"></i>
                <i onclick="editTodo(${todo.id})" class="editButton fa-solid fa-pen-to-square p-1 bg-blue-500 text-white cursor-pointer"></i>
                <i onclick="removeTodo(${todo.id})" class="deleteButton fa-solid fa-trash p-1 bg-blue-500 text-white cursor-pointer"></i>
            </div>
    `

    listDiv.append(div)
}

function removeTodo(id){
    const todoElement = document.getElementById(id)
    savingTodo.splice(savingTodo.findIndex(todo=> todo.id===id),1)
    localStorage.setItem("todos",JSON.stringify(savingTodo))
    todoElement.remove()
}

function handleClick(id){
    const todo = savingTodo.find(todo => todo.id===id)
    todo.completed = !todo.completed
    const todoDiv = document.getElementById(todo.id)
    todoDiv.children[0].classList.toggle("line-through")
    todoDiv.children[0].classList.toggle("opacity-25")
    console.log(todo)
}

function editTodo(id){
    const todo = savingTodo.find(todo => todo.id === id)
    const todoDiv = document.getElementById(todo.id)
    const newText = prompt("Düzenle")
    if(newText.trim() !== ""){
        todo.text = newText.trim();
        localStorage.setItem("todos",JSON.stringify(savingTodo))
        todoDiv.querySelector("span").textContent = newText.trim();
    }
    else{
        alert("Boş karakter giremezsiniz")
    }

}

const allButton =  document.getElementById("allButton")
const activeButton = document.getElementById("activeButton")
const completedButton = document.getElementById("completedButton")
const buttons = [allButton,activeButton,completedButton]


activeButton.addEventListener("click",()=>{
    [...buttons].map(button=>{
        button.classList.remove("clicked")
    })
    activeButton.classList.add("clicked")
    activeButton.disabled = true
    allButton.disabled = false
    completedButton.disabled = false
    active()
})

allButton.addEventListener("click",()=>{
    [...buttons].map(button=>{
        button.classList.remove("clicked")
    })
    allButton.classList.add("clicked")
    activeButton.disabled = false
    allButton.disabled = true
    completedButton.disabled = false
    all()
})

completedButton.addEventListener("click",()=>{
    [...buttons].map(button=>{
        button.classList.remove("clicked")
    })
    completedButton.classList.add("clicked")
    activeButton.disabled = false
    allButton.disabled = false
    completedButton.disabled = true
    completed()

})


function active(){
    const completed = savingTodo.filter(todo => todo.completed === true)
    const active = savingTodo.filter(todo=>todo.completed===false)
    active.forEach(element=>{
        const elementDiv = document.getElementById(element.id)
        elementDiv.classList.remove("hidden")
    })
    completed.forEach(element => {
        const elementDiv = document.getElementById(element.id)
        elementDiv.classList.add("hidden")
    });
}
function all(){
    const todo = savingTodo.filter(todo => todo.id)
    todo.forEach(t=>{
        const todoDiv = document.getElementById(t.id)
        todoDiv.classList.remove("hidden")
    })

}

function completed(){
    const active = savingTodo.filter(todo=> todo.completed===false)
    const completed = savingTodo.filter(todo => todo.completed ===true)
    completed.forEach(t=>{
        const todoDiv = document.getElementById(t.id)
        todoDiv.classList.remove("hidden")
    })
    active.forEach(t=>{
        const todoDiv = document.getElementById(t.id)
        todoDiv.classList.add("hidden")
    })
}
