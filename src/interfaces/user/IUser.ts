interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password?: string | null;
  avatar: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type { IUser };