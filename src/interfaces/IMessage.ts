export interface IMessage {
  id?: number | null;
  tel: string;
  text: string;
}

export interface ISubmitMessage extends IMessage {
  text: string | null;
  msgPack: object | null;
  message_type: 'lock' | 'push' | 'unlock' | 'reminder' | 'notification';
}
