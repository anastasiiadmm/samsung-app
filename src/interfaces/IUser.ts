export interface ITokens {
  refresh: string;
  access: string;
}

export interface userMutation {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}
