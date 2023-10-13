export interface ICommands {
  command?: string;
  payload?: {
    device_uid?: string | undefined;
    message?: string;
    tel?: string;
    full_screen?: boolean;
    email?: string;
  };
}
