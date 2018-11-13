function todoToItem(todoObject) {
    return `
        <li class="todo-list-item">
            ${todoObject.name}
        </li>
    `;
}


function todoList(arrayOfTodos) {
    const todoItems = arrayOfTodos.map(todoToItem).join('');
    return `
        <ul>
            ${todoItems}
        </ul>
    `;
}
module.exports = todoList;