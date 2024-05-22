interface IGameDetails {
  team_home: {
    id: string;
    avatar: string | null;
    name: string;
    Game_detail: {
      id: string;
      type: string;
      player_number_one: number;
      player_number_two: number | null;
      time: number | Date;
      stop: string | null;
      first_half: boolean | null;
      second_half: boolean | null;
    }[]
  },
  team_away: {
    id: string;
    avatar: string | null;
    name: string;
    Game_detail: {
      id: string;
      type: string;
      player_number_one: number;
      player_number_two: number | null;
      time: number | Date;
      stop: string | null;
      first_half: boolean | null;
      second_half: boolean | null;
    }[]
  }
};

export type { IGameDetails };