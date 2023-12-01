export interface IUser {
  company: number;
  created_at: string;
  email: string;
  first_name: string;
  groups: IGroup[];
  id: number;
  is_active: boolean;
  last_name: string;
  middle_name: string;
  phone: string;
  updated_at: string;
  username: string;
}

export interface IGroup {
  id: number;
  name: string;
}

export interface IUserSignIn {
  username: string | null;
  password: string | null;
}
