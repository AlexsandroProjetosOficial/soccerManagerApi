/*
  Warnings:

  - Added the required column `status` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `games` table without a default value. This is not possible if the table is not empty.

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
    "additional_time_first_half" DATETIME,
    "end_time_first_half" DATETIME,
    "time_match_official_second_half" DATETIME,
    "time_team_home_second_half" DATETIME,
    "time_team_away_second_half" DATETIME,
    "start_time_second_half" DATETIME,
    "additional_time_second_half" DATETIME,
    "end_time_second_half" DATETIME,
    "status" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "games_league_id_fkey" FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_team_home_id_fkey" FOREIGN KEY ("team_home_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_team_away_id_fkey" FOREIGN KEY ("team_away_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_stadium_id_fkey" FOREIGN KEY ("stadium_id") REFERENCES "stadiums" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_games" ("additional_time_first_half", "additional_time_second_half", "category_id", "created_at", "end_time_first_half", "end_time_second_half", "id", "league_id", "match_date", "stadium_id", "start_time_first_half", "start_time_second_half", "team_away_id", "team_home_id", "time_match_official_first_half", "time_match_official_second_half", "time_team_away_first_half", "time_team_away_second_half", "time_team_home_first_half", "time_team_home_second_half", "updated_at") SELECT "additional_time_first_half", "additional_time_second_half", "category_id", "created_at", "end_time_first_half", "end_time_second_half", "id", "league_id", "match_date", "stadium_id", "start_time_first_half", "start_time_second_half", "team_away_id", "team_home_id", "time_match_official_first_half", "time_match_official_second_half", "time_team_away_first_half", "time_team_away_second_half", "time_team_home_first_half", "time_team_home_second_half", "updated_at" FROM "games";
DROP TABLE "games";
ALTER TABLE "new_games" RENAME TO "games";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
