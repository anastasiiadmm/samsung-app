export enum ICommandVarious {
  lock = 'lock',
  unlock = 'unlock',
  delete = 'delete',
  getInfo = 'get-info',
  sendMessage = 'send-message',
  getDeviceLog = 'get-device-log',
  uploadDevices = 'upload-devices',
  setBlinkingReminder = 'set-blinking-reminder',
}

export interface ICommands {
  command?: ICommandVarious;
  payload?: {
    lock?: {
      device_uid?: string;
      message?: string;
      tel?: string;
      email?: string;
    };
    unlock?: {
      device_uid?: string;
      message: string;
    };
    'send-message'?: {
      device_uid?: string;
      message: string;
      tel: string;
      enable_full_screen: boolean;
    };
    'set-blinking-reminder'?: {
      device_uid?: string;
      message: string;
      interval: number;
      tel: string;
      email: string;
      time_limit_enable: boolean;
      days_limit_enable: boolean;
      days_limit: [];
      time_limit: [];
    };
    delete?: {
      device_uid?: string;
    };
    'get-info'?: {
      device_uid?: string;
    };
    'get-device-log'?: {
      device_uid?: string;
    };
    'upload-devices'?: {
      device_list?: string[];
    };
  };
}
