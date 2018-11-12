
function userForm(aUser) {
    return `
        <a href="/users">Return to user list</a>
        <form action="/users/${aUser.id}/edit" method="POST">
            <input type="text" name="name" value="${aUser.name}">
            <br>
            <input type="submit">
        </form>    
    `;
}

module.exports = userForm;