/*
  Warnings:

  - Added the required column `stop` to the `game_details` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_game_details" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "game_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "player_number_one" INTEGER NOT NULL,
    "player_number_two" INTEGER,
    "time" INTEGER NOT NULL,
    "stop" TEXT NOT NULL,
    "first_half" BOOLEAN,
    "second_half" BOOLEAN,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "game_details_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_details_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_game_details" ("created_at", "first_half", "game_id", "id", "player_number_one", "player_number_two", "second_half", "team_id", "time", "type") SELECT "created_at", "first_half", "game_id", "id", "player_number_one", "player_number_two", "second_half", "team_id", "time", "type" FROM "game_details";
DROP TABLE "game_details";
ALTER TABLE "new_game_details" RENAME TO "game_details";
PRAGMA foreign_key_check("game_details");
PRAGMA foreign_keys=ON;
