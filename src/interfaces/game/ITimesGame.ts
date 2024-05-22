interface ITimesGame {
  time_match_official_first_half: Date | null;
  time_match_official_second_half: Date | null;
  time_team_home_first_half: Date | null;
  time_team_home_second_half: Date | null;
  time_team_away_first_half: Date | null;
  time_team_away_second_half: Date | null;
  end_time_first_half: Date | null;
  end_time_second_half: Date | null;
};

export type { ITimesGame };