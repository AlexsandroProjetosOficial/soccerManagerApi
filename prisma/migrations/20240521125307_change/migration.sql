/*
  Warnings:

  - You are about to alter the column `additional_time_first_half` on the `games` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.
  - You are about to alter the column `additional_time_second_half` on the `games` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_games" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "league_id" TEXT NOT NULL,
    "team_home_id" TEXT NOT NULL,
    "team_away_id" TEXT NOT NULL,
    "stadium_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "match_date" DATETIME NOT NULL,
    "time_match_official_first_half" DATETIME,
    "time_team_home_first_half" DATETIME,
    "time_team_away_first_half" DATETIME,
    "start_time_first_half" DATETIME,
    "additional_time_first_half" INTEGER,
    "end_time_first_half" DATETIME,
    "time_match_official_second_half" DATETIME,
    "time_team_home_second_half" DATETIME,
    "time_team_away_second_half" DATETIME,
    "start_time_second_half" DATETIME,
    "additional_time_second_half" INTEGER,
    "end_time_second_half" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'waiting',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "games_league_id_fkey" FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_team_home_id_fkey" FOREIGN KEY ("team_home_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_team_away_id_fkey" FOREIGN KEY ("team_away_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_stadium_id_fkey" FOREIGN KEY ("stadium_id") REFERENCES "stadiums" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_games" ("additional_time_first_half", "additional_time_second_half", "category_id", "created_at", "end_time_first_half", "end_time_second_half", "id", "league_id", "match_date", "stadium_id", "start_time_first_half", "start_time_second_half", "status", "team_away_id", "team_home_id", "time_match_official_first_half", "time_match_official_second_half", "time_team_away_first_half", "time_team_away_second_half", "time_team_home_first_half", "time_team_home_second_half", "updated_at", "user_id") SELECT "additional_time_first_half", "additional_time_second_half", "category_id", "created_at", "end_time_first_half", "end_time_second_half", "id", "league_id", "match_date", "stadium_id", "start_time_first_half", "start_time_second_half", "status", "team_away_id", "team_home_id", "time_match_official_first_half", "time_match_official_second_half", "time_team_away_first_half", "time_team_away_second_half", "time_team_home_first_half", "time_team_home_second_half", "updated_at", "user_id" FROM "games";
DROP TABLE "games";
ALTER TABLE "new_games" RENAME TO "games";
PRAGMA foreign_key_check("games");
PRAGMA foreign_keys=ON;
