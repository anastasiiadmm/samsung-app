import { ICommandVarious } from '@/interfaces/ICommands';

export interface IMessage {
  id?: number | null;
  tel: string;
  text: string;
  email: string;
}

export interface ISubmitMessage extends IMessage {
  msgPack: object;
  text: string | null;
  message_type: ICommandVarious;
}
