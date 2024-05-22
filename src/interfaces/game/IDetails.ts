interface IDetails {
  home: {
    teamId: string | undefined;
    avatar: string | null | undefined;
    name: string | undefined;
    cards: {
      id: string;
      type: string;
      playerNumber: number;
      period: string;
      time: string;
    }[] | undefined,
    goals: {
      id: string;
      playerNumber: number;
      period: string;
      time: string;
    }[] | undefined,
    substitutions: {
      id: string;
      stop: string | null;
      playerIn: number;
      playerOut: number | null;
      period: string;
      time: string;
    }[] | undefined
  },
  away: {
    teamId: string | undefined;
    avatar: string | null | undefined;
    name: string | undefined;
    cards: {
      id: string;
      type: string;
      playerNumber: number;
      period: string;
      time: string;
    }[] | undefined,
    goals: {
      id: string;
      playerNumber: number;
      period: string;
      time: string;
    }[] | undefined,
    substitutions: {
      id: string;
      stop: string | null;
      playerIn: number;
      playerOut: number | null;
      period: string;
      time: string;
    }[] | undefined
  }
};

export type { IDetails };