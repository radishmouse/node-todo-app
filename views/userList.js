
function userToItem(userObject) {
    return `
        <li>${userObject.name}</li>
    `;
}
function userList(arrayOfUsers) {
    const userItems = arrayOfUsers.map(userToItem).join('');
    return `
        <ul>${userItems}</ul>
    `;
}

module.exports = userList;