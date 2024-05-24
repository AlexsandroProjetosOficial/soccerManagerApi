interface ITeam {
  teamId: string | undefined;
  avatar: string | null | undefined;
  name: string | undefined;
  cards: {
    id: string;
    type: string;
    playerNumber: number;
    period: string;
    time: string;
    isConfirmed: boolean;
  }[] | undefined,
  goals: {
    id: string;
    playerNumber: number;
    period: string;
    time: string;
    isConfirmed: boolean;
  }[] | undefined,
  substitutions: {
    id: string;
    stop: string | null;
    playerIn: number;
    playerOut: number | null;
    period: string;
    time: string;
    isConfirmed: boolean;
  }[] | undefined
}
interface IDetails {
  home: ITeam,
  away: ITeam
};

export type { IDetails };