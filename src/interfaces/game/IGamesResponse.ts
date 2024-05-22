interface IGamesResponse {
  id: string;
  league: string;
  avatar: string | null;
  teams: string;
  category: string;
  nivel: string;
  date: string;
  location: string;
  status: string;
  isAllArrived: boolean;
};

export type { IGamesResponse };