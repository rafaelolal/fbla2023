-- CreateTable
CREATE TABLE "Admin" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Award" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "requirement" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "datetime" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Student" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "StudentsOnEvents" (
    "eventId" INTEGER NOT NULL,
    "studentEmail" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    PRIMARY KEY ("eventId", "studentEmail"),
    CONSTRAINT "StudentsOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentsOnEvents_studentEmail_fkey" FOREIGN KEY ("studentEmail") REFERENCES "Student" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "News" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "datetime" DATETIME NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AwardToStudent" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AwardToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Award" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AwardToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student" ("email") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AwardToStudent_AB_unique" ON "_AwardToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_AwardToStudent_B_index" ON "_AwardToStudent"("B");
