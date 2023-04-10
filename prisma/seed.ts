import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  // Create admin user
  await prisma.user.create({
    data: {
      id: 'admin',
      email: 'admin@gmail.com',
      username: 'admin',
      password: 'admin',
      role: 'admin',
    },
  });

  await createUsers(50);

  const users = await prisma.user.findMany();

  console.log(users);
  console.log(`total: ${users.length}`);
})();

async function getUsers(_limit: number = 10, _skip: number = 0, _sort: string = 'id', _order: string = 'asc') {
  return await prisma.user.findMany({
    skip: Math.abs(Number(_skip)),
    take: Math.abs(Number(_limit)),
    orderBy: { [_sort]: _order },
    where: {},
  });
}

async function createUsers(noOfUsers: number) {
  for (let i = 0; i < noOfUsers; i++) {
    await createUser(i, noOfUsers);
  }
}

async function createUser(index: number, noOfUsers: number) {
  const newIndex = index.toString().padStart(noOfUsers.toString().length, '0');
  const roles = ['admin', 'student', 'teacher'];

  return await prisma.user.create({
    data: {
      id: newIndex,
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      role: roles[Math.floor(Math.random() * roles.length)],
    },
  });
}
