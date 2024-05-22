type ITimesGameResponse = {
  referee: {
    first: boolean;
    second: boolean;
  },
  home: {
    first: boolean;
    second: boolean;
  },
  away: {
    first: boolean;
    second: boolean;
  },
  match: {
    first: boolean;
    second: boolean;
  }
};

export type { ITimesGameResponse };