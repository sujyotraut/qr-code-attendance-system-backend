import { faker } from '@faker-js/faker';
import { Attendance, Lecture, PrismaClient, Student, Teacher, User } from '@prisma/client';

const prisma = new PrismaClient();

type UserData = Omit<User, 'id'>;
type StudentData = Omit<Student, 'id'> & { name: string; email: string };
type TeacherData = Omit<Teacher, 'id'> & { name: string; email: string };
type LectureData = Omit<Lecture, 'id'>;
type AttendanceData = Omit<Attendance, 'id'>;

(async function main() {
  // Create admin user
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@attendance.com',
      username: 'admin',
      password: 'admin',
      role: 'admin',
    },
  });

  // Create teacher
  await prisma.user.create({
    data: {
      name: 'Teacher User',
      email: 'teacher@attendance.com',
      username: 'teacher',
      password: 'teacher',
      role: 'teacher',
      teacher: { create: {} },
    },
  });

  // Create students
  await createStudents();

  // Log
  const totalUsers = await prisma.user.count();
  console.log(`Total ${totalUsers} users add to the database`);
})();

//#region User
async function createUsers(noOfUsers: number) {
  for (let i = 0; i < noOfUsers; i++) {
    await createUserWithRandomData();
  }
}

async function createUserWithRandomData() {
  const roles = ['admin', 'student', 'teacher'];

  const name = faker.name.fullName();
  const email = faker.internet.email();
  const username = faker.internet.userName();
  const password = faker.internet.password();
  // const role = roles[Math.floor(Math.random() * roles.length)];
  const role = roles[0];

  return await createUserFromData({ name, email, username, password, role });
}

async function createUserFromData(data: UserData) {
  const user = await prisma.user.create({ data });
  console.log(`User with id: '${user.id}' added to the database`);
  return user;
}
//#endregion

//#region Student
async function createStudents() {
  const courses = new Map<string, { branches: string[]; semestersCount: number }>();

  const engineeringBranches = ['General', 'CSE', 'Mechanical', 'Civil'];
  courses.set('BE', { branches: engineeringBranches, semestersCount: 8 });

  // const polyBranches = ['General', 'CSE', 'Mechanical', 'Civil'];
  // courses.set('Poly', { branches: polyBranches, semestersCount: 6 });

  const oddOrEven = Math.round(Math.random());
  for (const course of courses.keys()) {
    const branches = courses.get(course)!.branches;
    const semestersCount = courses.get(course)!.semestersCount;

    for (const branch of branches) {
      if (branch === 'General') {
        const year = `${withOrdinal(1)} Year`;
        const semester = `${withOrdinal(2 - oddOrEven)} Semester`;
        const studentsCount = 120;

        for (let index = 1; index <= studentsCount; index++) {
          const dateOfBirth = faker.date.birthdate({ min: 21, max: 25, mode: 'age' }).toISOString().split('T')[0];
          const firstName = faker.name.firstName();
          const lastname = faker.name.lastName();
          const name = `${firstName} ${lastname}`;
          const email = faker.internet.email(firstName, lastname);
          const rollNo = `${index}`;
          const maxIdCount = 9999999;
          const studentId = `TBE${Math.floor(Math.random() * maxIdCount)
            .toString()
            .padStart(maxIdCount.toString().length, '0')}`;

          await createStudentFromData({ course, year, semester, branch, rollNo, studentId, name, email, dateOfBirth });
        }
      } else {
        for (let index = 2; index <= Math.ceil(semestersCount / 2); index++) {
          const year = `${withOrdinal(index)} Year`;
          const semester = `${withOrdinal(index * 2 - oddOrEven)} Semester`;
          const studentsCount = 60;

          for (let index = 1; index <= studentsCount; index++) {
            const dateOfBirth = faker.date.birthdate({ min: 21, max: 25, mode: 'age' }).toISOString().split('T')[0];
            const firstName = faker.name.firstName();
            const lastname = faker.name.lastName();
            const name = `${firstName} ${lastname}`;
            const email = faker.internet.email(firstName, lastname);
            const rollNo = `${index}`;
            const maxIdCount = 9999999;
            const studentId = `TBE${Math.floor(Math.random() * maxIdCount)
              .toString()
              .padStart(maxIdCount.toString().length, '0')}`;

            await createStudentFromData({
              course,
              year,
              semester,
              branch,
              rollNo,
              studentId,
              name,
              email,
              dateOfBirth,
            });
          }
        }
      }
    }
  }
}

async function createStudentWithRandomData() {
  // const courses = ['BE', 'Poly'];
  const courses = new Map<String, { branches: String[]; semestersCount: number }>();

  const engineeringBranches = ['General', 'CSE', 'Mechanical', 'Civil'];
  courses.set('BE', { branches: engineeringBranches, semestersCount: 8 });

  const polyBranches = ['General', 'CSE', 'Mechanical', 'Civil'];
  courses.set('Poly', { branches: polyBranches, semestersCount: 6 });

  const randomIndex = Math.floor(Math.random() * courses.size);
  const randomKey = [...courses.keys()][randomIndex];
  const randomCourse = courses.get(randomKey)!;

  const course = randomKey.toString();
  const branch = randomCourse.branches[Math.floor(Math.random() * randomCourse.branches.length)].toString();
  const semester = Math.floor(Math.random() * randomCourse.semestersCount).toString();
  const year = Math.ceil(Number(semester) / 2).toString();
  const rollNo = Math.floor(Math.random() * 60).toString();
  const dateOfBirth = faker.date.birthdate({ min: 21, max: 25, mode: 'age' }).toISOString().split('T')[0];
  const firstName = faker.name.firstName();
  const lastname = faker.name.lastName();
  const name = `${firstName} ${lastname}`;
  const email = faker.internet.email(firstName, lastname);

  const studentId = `TBE${Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5)}`;

  return await createStudentFromData({ branch, course, semester, year, rollNo, studentId, name, email, dateOfBirth });
}

async function createStudentFromData({ name, email, ...data }: StudentData) {
  const { student } = await prisma.user.create({
    data: {
      name,
      email,
      username: data.studentId,
      password: data.dateOfBirth,
      role: 'student',
      student: { create: data },
    },
    include: { student: true },
  });

  console.log(`Student with id: '${student!.id}' added to the database`);
  return student!;
}
//#endregion

//#region Teacher
async function createTeacherFromData({ name, email, ...data }: TeacherData) {
  const { teacher } = await prisma.user.create({
    data: {
      name,
      email,
      username: email,
      password: `${name.split('s')[0]}@1234`,
      role: 'student',
      teacher: { create: data },
    },
    include: { teacher: true },
  });

  console.log(`Teacher with id: '${teacher!.id}' added to the database`);
  return teacher!;
}
//#endregion

function withOrdinal(num: number) {
  switch (num) {
    case 1:
      return `${num}st`;
    case 2:
      return `${num}nd`;
    case 3:
      return `${num}rd`;
    default:
      return `${num}th`;
  }
}
