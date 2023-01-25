-- CreateTable
CREATE TABLE "Quarter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "StudentsOnQuarters" (
    "quarterId" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "place" INTEGER NOT NULL,
    "claimed" BOOLEAN NOT NULL,
    "eventId" INTEGER,

    PRIMARY KEY ("quarterId", "studentId"),
    CONSTRAINT "StudentsOnQuarters_quarterId_fkey" FOREIGN KEY ("quarterId") REFERENCES "Quarter" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StudentsOnQuarters_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StudentsOnQuarters_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "StudentsOnReports" (
    "reportId" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "eventId" INTEGER,

    PRIMARY KEY ("reportId", "studentId"),
    CONSTRAINT "StudentsOnReports_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StudentsOnReports_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StudentsOnReports_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rally" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "datetime" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL DEFAULT 'default@email.com',
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "grade" INTEGER,
    "bio" TEXT,
    "image" TEXT NOT NULL DEFAULT 'default.jpg',
    "points" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER
);
INSERT INTO "new_Student" ("bio", "firstName", "grade", "id", "image", "lastName", "middleName", "points", "rank") SELECT "bio", "firstName", "grade", "id", "image", "lastName", "middleName", "points", "rank" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
