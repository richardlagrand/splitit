import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    console.log("Users retrieved:", users);
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
  }
}

async function addUser() {
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
    },
  });
  console.log(user);
}

addUser()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export default { getUsers, addUser };
