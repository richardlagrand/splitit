import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    console.log("Users retrieved:", users);
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
  }
}

export async function addUser(userData, stripeData) {
  const user = await prisma.user.create({
    data: {
      username: userData.username,
      email: userData.email,
      password: userData.password, //needs to be stored hashed later on !!
      account: stripeData.id,
      roles: { create: { roleId: 1 } },
    },
  });
  console.log(user);
}

export async function findUser(loginData) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: loginData.email,
      },
    });
    console.log("User retrieved:", user);
    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
  }
}
