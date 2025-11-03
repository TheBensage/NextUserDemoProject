export type User = {
  id: number;
  fullName: string;
  age: number;
  country: string;
  interests: string;
};

export type NewUser = Omit<User, "id">;
