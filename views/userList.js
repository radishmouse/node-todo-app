
function userToItem(userObject) {
    return `
        <li class="user-list-item">
          <a href="/users/${userObject.id}/todos">
            ${userObject.name}
          </a>
        </li>
    `;
}
function userList(arrayOfUsers) {
    const userItems = arrayOfUsers.map(userToItem).join('');
    console.log(userItems);
    return `
        <ul>${userItems}</ul>
    `;
}

module.exports = userList;