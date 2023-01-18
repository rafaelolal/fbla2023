-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StudentsOnEvents" (
    "eventId" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,
    "attended" BOOLEAN NOT NULL DEFAULT false,
    "studentName" TEXT NOT NULL,

    PRIMARY KEY ("eventId", "studentId"),
    CONSTRAINT "StudentsOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StudentsOnEvents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StudentsOnEvents" ("attended", "eventId", "studentId", "studentName") SELECT "attended", "eventId", "studentId", "studentName" FROM "StudentsOnEvents";
DROP TABLE "StudentsOnEvents";
ALTER TABLE "new_StudentsOnEvents" RENAME TO "StudentsOnEvents";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
