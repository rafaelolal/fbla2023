-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY
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
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "isCanceled" BOOLEAN NOT NULL DEFAULT false,
    "reason" TEXT
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "grade" INTEGER NOT NULL DEFAULT -1,
    "points" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER NOT NULL DEFAULT -1,
    "image" TEXT NOT NULL DEFAULT 'default.jpg',
    "bio" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "StudentsOnEvents" (
    "eventId" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,
    "attended" BOOLEAN NOT NULL DEFAULT false,
    "studentName" TEXT NOT NULL,

    PRIMARY KEY ("eventId", "studentId"),
    CONSTRAINT "StudentsOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentsOnEvents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    CONSTRAINT "_AwardToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AwardToStudent_AB_unique" ON "_AwardToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_AwardToStudent_B_index" ON "_AwardToStudent"("B");
