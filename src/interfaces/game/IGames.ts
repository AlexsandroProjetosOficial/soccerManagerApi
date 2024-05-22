interface IGames {
  id: string;
  match_date: Date;
  status: string;
  category: { name: string };
  league: {
    avatar: string | null;
    name: string;
  },
  stadium: { nickname: string; };
  team_home: { name: string; };
  team_away: { name: string; };
  Match_official: {
    referee_arrival_time: Date | null;
  }[]
};

export type { IGames };