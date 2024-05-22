type IOfficials = {
  id: string;
  referee_arrival_time: Date | null;
  referee: {
    name: string;
    position: string;
    avatar: string | null;
    phone: string;
  };
};

export type { IOfficials };