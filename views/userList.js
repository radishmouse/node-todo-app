
function userToItem(userObject) {
    return `
        <li class="user-list-item">
          <a href="#">
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