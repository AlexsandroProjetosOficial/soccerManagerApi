-- CreateTable
CREATE TABLE "organizers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "leagues" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "avatar" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "organizer_id" TEXT NOT NULL,
    CONSTRAINT "leagues_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "organizers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "stadiums" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "avatar" TEXT,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "referees" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "avatar" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "league_id" TEXT NOT NULL,
    "team_home_id" TEXT NOT NULL,
    "team_away_id" TEXT NOT NULL,
    "stadium_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "match_date" DATETIME NOT NULL,
    "time_match_official_first_half" DATETIME NOT NULL,
    "time_team_home_first_half" DATETIME NOT NULL,
    "time_team_away_first_half" DATETIME NOT NULL,
    "start_time_first_half" DATETIME NOT NULL,
    "additional_time_first_half" DATETIME NOT NULL,
    "end_time_first_half" DATETIME NOT NULL,
    "time_match_official_second_half" DATETIME NOT NULL,
    "time_team_home_second_half" DATETIME NOT NULL,
    "time_team_away_second_half" DATETIME NOT NULL,
    "start_time_second_half" DATETIME NOT NULL,
    "additional_time_second_half" DATETIME NOT NULL,
    "end_time_second_half" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "games_league_id_fkey" FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_team_home_id_fkey" FOREIGN KEY ("team_home_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_team_away_id_fkey" FOREIGN KEY ("team_away_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_stadium_id_fkey" FOREIGN KEY ("stadium_id") REFERENCES "stadiums" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "games_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "match_officials" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "game_id" TEXT NOT NULL,
    "referee_id" TEXT NOT NULL,
    "referee_arrival_time" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "match_officials_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "match_officials_referee_id_fkey" FOREIGN KEY ("referee_id") REFERENCES "referees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "game_details" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "game_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "player_number_one" INTEGER NOT NULL,
    "player_number_two" INTEGER,
    "time" DATETIME NOT NULL,
    "first_half" BOOLEAN,
    "second_half" BOOLEAN,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "game_details_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_details_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "organizers_name_key" ON "organizers"("name");
