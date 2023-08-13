// this is for the local storage stuff
const localStorageKey = "todolist1"
let todolist = JSON.parse(localStorage.getItem(localStorageKey)) || []

function filteredTodolist(text) {
    const newArray = todolist.filter((todo) => {
        if(todo.name.includes(text)) return todo
    })
    return newArray
}

let currentSortOrder = "asc"
const flipSortOrder = () => currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc"

function sortTodos(sortBy, array = todolist) {
    const isOrderAscending = currentSortOrder === "asc" ? 1 : -1
    array.sort((a, b) => {
        if (a[sortBy] > bz[sortBy]) return 1 * isOrderAscending
        else if (a[sortBy] < b[sortBy]) return -1 * isOrderAscending
        return 0
    })
    flipSortOrder
}

function updateLocalStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(todolist))
}

function addTodo(todoText) {
    todolist.push({
        name: todoText,
        class: Date.now()
    })
}

function removeTodo(todo) {
    todolist = todolist.filter((item) => {
        if(item.class === todo.class) return false
        return true
    })
    updateLocalStorage()
}

export {todolist, updateLocalStorage, removeTodo, addTodo, sortTodos, filteredTodolist}