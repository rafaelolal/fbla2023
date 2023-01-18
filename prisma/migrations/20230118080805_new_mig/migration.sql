-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "grade" INTEGER NOT NULL DEFAULT -1,
    "bio" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT 'default.jpg',
    "points" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER
);
INSERT INTO "new_Student" ("bio", "firstName", "grade", "id", "image", "lastName", "middleName", "points", "rank") SELECT "bio", "firstName", "grade", "id", "image", "lastName", "middleName", "points", "rank" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
