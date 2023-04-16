import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
  // Create admin user
  await prisma.user.create({
    data: {
      id: 'admin',
      email: 'admin@attendance.com',
      username: 'admin',
      password: 'admin',
      role: 'admin',
    },
  });

  await createUsers(50);

  const totalUsers = await prisma.user.count();
  console.log(`Total ${totalUsers} users add to the database`);
})();

async function createUsers(noOfUsers: number) {
  for (let i = 0; i < noOfUsers; i++) {
    await createUser(i, noOfUsers);
  }
}

async function createUser(index: number, noOfUsers: number) {
  const id = index.toString().padStart(noOfUsers.toString().length, '0');
  const email = faker.internet.email();
  const username = faker.internet.userName();
  const password = faker.internet.password();
  const roles = ['admin', 'student', 'teacher'];
  const role = roles[Math.floor(Math.random() * roles.length)];

  const user = await prisma.user.create({
    data: {
      id,
      email,
      username,
      password,
      role,
    },
  });

  console.log(`User with id: '${id}' added to the database`);
  return user;
}
