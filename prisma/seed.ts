import { faker } from '@faker-js/faker';
import { Attendance, Lecture, PrismaClient, Student, Teacher, User } from '@prisma/client';

const prisma = new PrismaClient();

type UserData = Omit<User, 'id'>;
type StudentData = Omit<Student, 'id' | 'deviceId'> & { name: string; email: string; gender: string };
type TeacherData = Omit<Teacher, 'id'> & { name: string; email: string; gender: string };
type LectureData = Omit<Lecture, 'id'>;
type AttendanceData = Omit<Attendance, 'id'>;

(async function main() {
  // Create admin user
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@attendance.com',
      gender: 'male',
      username: 'admin',
      password: 'admin',
      role: 'admin',
    },
  });

  // Create teacher
  await prisma.user.create({
    data: {
      name: 'Barckeys',
      email: 'brackeys@attendance.com',
      gender: 'male',
      username: 'brackeys',
      password: 'brackeys@1234',
      role: 'teacher',
      teacher: { create: {} },
    },
  });

  await prisma.user.create({
    data: {
      name: 'Dani',
      email: 'dani@attendance.com',
      gender: 'male',
      username: 'dani',
      password: 'dani@1234',
      role: 'teacher',
      teacher: { create: {} },
    },
  });

  await prisma.user.create({
    data: {
      name: 'Aditya R.',
      email: 'aditya@attendance.com',
      gender: 'male',
      username: 'aditya',
      password: 'aditya@1234',
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

  const gender = faker.name.sexType();
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  // const name = faker.name.fullName({ sex: gender });
  const name = `${firstName} ${lastName}`;
  const email = faker.internet.email(firstName, lastName, 'gmail.com');
  const username = faker.internet.userName();
  const password = faker.internet.password();
  // const role = roles[Math.floor(Math.random() * roles.length)];
  const role = roles[0];

  return await createUserFromData({ name, email, gender, username, password, role });
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
          const gender = faker.name.sexType();
          const firstName = faker.name.firstName(gender);
          const lastName = faker.name.lastName(gender);
          // const name = faker.name.fullName({ sex: gender });
          const name = `${firstName} ${lastName}`;
          const email = faker.internet.email(firstName, lastName, 'gmail.com');
          // const firstName = faker.name.firstName();
          // const lastname = faker.name.lastName();
          // const name = `${firstName} ${lastname}`;
          // const email = faker.internet.email(firstName, lastname);
          const rollNo = `${index}`;
          const maxIdCount = 9999999;
          const studentId = `EN${Math.floor(Math.random() * maxIdCount)
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
            gender,
            dateOfBirth,
          });
        }
      } else {
        for (let index = 2; index <= Math.ceil(semestersCount / 2); index++) {
          const year = `${withOrdinal(index)} Year`;
          const semester = `${withOrdinal(index * 2 - oddOrEven)} Semester`;
          const studentsCount = 60;

          for (let index = 1; index <= studentsCount; index++) {
            const dateOfBirth = faker.date.birthdate({ min: 21, max: 25, mode: 'age' }).toISOString().split('T')[0];
            // const firstName = faker.name.firstName();
            // const lastname = faker.name.lastName();
            // const name = `${firstName} ${lastname}`;
            // const email = faker.internet.email(firstName, lastname);
            const gender = faker.name.sexType();
            const firstName = faker.name.firstName(gender);
            const lastName = faker.name.lastName(gender);
            // const name = faker.name.fullName({ sex: gender });
            const name = `${firstName} ${lastName}`;
            const email = faker.internet.email(firstName, lastName, 'gmail.com');
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
              gender,
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
  const gender = faker.name.sexType();
  const firstName = faker.name.firstName(gender);
  const lastname = faker.name.lastName(gender);
  const name = `${firstName} ${lastname}`;
  const email = faker.internet.email(firstName, lastname);

  const studentId = `TBE${Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5)}`;

  return await createStudentFromData({
    branch,
    course,
    semester,
    year,
    rollNo,
    studentId,
    name,
    email,
    gender,
    dateOfBirth,
  });
}

async function createStudentFromData({ name, email, gender, ...data }: StudentData) {
  const { student } = await prisma.user.create({
    data: {
      name,
      email,
      gender,
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
async function createTeacherFromData({ name, email, gender, ...data }: TeacherData) {
  const { teacher } = await prisma.user.create({
    data: {
      name,
      email,
      gender,
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
