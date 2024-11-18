import { getUsers, addUser } from "../models/usersModel.js";

export async function gettingUsers(req, res) {
  const users = await getUsers();
  console.log(users);
  res.status(200).json(users);
}

export async function addingUsers(req, res) {
  const users = await getUsers();
  const newUser = req.body;
  if (users.some((user) => user.data.username === newUser.username)) {
    res.status(400).json({
      error: "Username already in use",
    });
  } else {
    addUser(newUser);
    res.status(201).json({
      message: "User created successfully",
      entry: newUser,
    });
  }
}
