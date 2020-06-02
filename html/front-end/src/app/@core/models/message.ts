export interface Message {
  key?: string;
  params?: {
    [key: string]: any;
  };
  message?: string;
  type: string;
}

export interface LoaderState {
  show: boolean;
}
