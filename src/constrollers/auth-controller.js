const login = async (req, res) => {
    const user = req.body;
    const username = user.username;
    const password = user.password;
    const existingUser = await userDao
        .findUserByUsername(username);

    if (!existingUser) {
        res.sendStatus(403);
        return;
    }

    const match = await bcrypt
        .compare(password, existingUser.password);

    if (match) {
        existingUser.password = '*****';
        req.session['profile'] = existingUser;
        res.json(existingUser);
    } else {
        res.sendStatus(403);
    }
};
app.post("/api/auth/login", login);