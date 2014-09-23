// STARTASYNC OMIT
function findFriends(userId, callback) {
  findUser(userId, function (err, user) {
    if (err) return callback(err)
    async.map(user.friends, findUser, callback) // HL
  })
}
function findUser(userId, callback) {
  db.users.findOne({_id: userId}, callback)
}
// ENDASYNC OMIT

// STARTPROMISE OMIT
function findFriends(userId) {
  return findUser(userId).then(function (user) {
    return Q.all(user.friends.map(findUser)) // HL
  })
}
function findUser(userId) {
  return Q.denodify(db.users.findOne.bind(db.users), {_id: userId}) // HL
}
// ENDPROMISE OMIT