createTuitByUser = (req, res) => {
    let userId = req.params.uid === "me"
    && req.session['profile'] ?
        req.session['profile']._id :
        req.params.uid;

    tuitDao
        .createTuitByUser(userId, req.body)
        .then((tuit) => res.json(tuit));
}

findTuitsByUser = (req, res) => {
    let userId = req.params.uid === "me"
    && req.session['profile'] ?
        req.session['profile']._id :
        req.params.uid;

    tuitDao
        .findTuitsByUser(userId)
        .then((tuits) => res.json(tuits));
}
