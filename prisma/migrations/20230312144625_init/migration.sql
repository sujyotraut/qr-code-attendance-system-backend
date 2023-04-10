-- CreateTable
CREATE TABLE "Lecture" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "course" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL
);
