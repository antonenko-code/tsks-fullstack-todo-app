db.createUser({
  user: "todo",
  pwd: "qwerty",
  roles: [ { role: "readWrite", db: "todoapp" } ]
});
