import { todolist, updateLocalStorage, removeTodo, addTodo, sortTodos, filteredTodolist, filteredTodolist} from "./To-do-list-data";

const myFormEl = document.querySelector(".my-form")
const todoText = document.querySelector(".todo-text")

myFormEl.addEventListener("submit", handleForm)
todoText.addEventListener("input", (event) => {
    if (!checkFormData(event.target.value)) return
    errorEl.textContent = ""
})

const todoSearchEl = document.getElementsByClassName("todo-search")
todoSearchEl.addEventListener("input", (event) => {
    const filteredTodolist = filteredTodolist(event.target.value)
    renderPendingTodos(filteredTodolist)
})

const errorEl = document.querySelector(".error")

//todolist container:
const todoPendingEl = document.querySelector(".todo-pending")
renderPendingTodos()

function checkFormData(data) {
    if(data.length < 5) {
        errorEl.textContent = "Enter 5 or more characters if you please"
        return
    }
    return true
}

function handleForm(event) {
    event.preventDefault()

    const formText = todoText.value
    if(!checkFormData(formText)) return
    errorEl.textContent = ""
    addTodo(formText)
    
    renderPendingTodos()
    todoText.value = ""

    updateLocalStorage()
}

function renderPendingTodos(todos = todolist) {
    todoPendingEl.innerHTML = ""
    //todoPendingEl.textContent = todolist
    todos.forEach(createTodoHtml)
}

function createTodoHtml(todo) {
    const paragraph = document.createElement("p")
    paragraph.textContent = todo.name
    paragraph.className = todo.className

    const spanEl = document.createElement("span")
    spanEl.textContent = timeStamp2Date(todo.className)

    const removeButton = document.createElement("button")
    removeButton.textContent = "Delete"

    removeButton.addEventListener("click", () => {
        paragraph.remove()
        removeTodo(todo)
    })
    paragraph.append(removeButton, spanEl)
    todoPendingEl.append(paragraph)
}

const buttonSortByNameEl = document.getElementsByClassName("sort-name")
const buttonSortByTimeEl = document.getElementsByClassName("sort-time")
const buttonSortAscending = document.getElementsByClassName("sort-order")

buttonSortByNameEl.addEventListener("click", () => {
    sortTodos("name")
    renderPendingTodos()
})
buttonSortByTimeEl.addEventListener("click", () => {
    sortTodos("class")
    renderPendingTodos()
})

function timeStamp2DateTime(timeStamp) {
    let dateOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }
    let dateFormat = new Intl.DateTimeFormat("no-NO", dateOptions)
    let viewFormattedDate = dateFormat.format(timeStamp)
    return viewFormattedDate
}