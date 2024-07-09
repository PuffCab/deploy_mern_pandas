export type NotOkType = {
  error: string;
};

export type User = {
  email: string;
  username: string;
  _id: string;
  avatar: string;
};
export type LoginOkResponse = {
  message: string;
  token: string;
  user: User;
};

export type GetProfileresponse = {
  message: string;
  user: User;
};
