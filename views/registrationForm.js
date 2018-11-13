function registrationForm() {
    return `
    <form action="/register" method="POST">
        <label>
            Your name:
            <input type="text" name="name">
        </label>
        <br>
        <label>
            Username:
            <input type="text" name="username">
        </label>
        <br>
        <label>
            Password:
            <input type="password" name="password">
        </label>
        <br>
        <input type="submit" value="Register!">
    </form>    
    `;
}

module.exports = registrationForm;