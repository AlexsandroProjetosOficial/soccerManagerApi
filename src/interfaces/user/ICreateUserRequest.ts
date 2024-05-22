interface ICreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
};

export type { ICreateUserRequest };