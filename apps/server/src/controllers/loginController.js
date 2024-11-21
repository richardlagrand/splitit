import { getUsers, findUser } from "../models/usersModel.js";

export async function loginUser(req, res) {
  const users = await getUsers();
  const loginData = req.body;
  if (users.some((user) => user.email !== loginData.email)) {
    res.status(401).json({
      error: "Not able to ahtenticate user",
    });
  } else {
    const user = await findUser(loginData);
    res.status(201).json({
      message: "User logged in successfully",
      user: user,
    });
  }
}
