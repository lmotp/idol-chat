export interface ChatMessage {
  _id?: string;
  createdAt?: string;
  message?: string;
  text?: string;
  user?: string;
  userId?: {
    _id?: string;
    profileimg?: string;
    nickname?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface ChatSection {
  _id?: string;
  date?: string;
  chat: ChatMessage[];
  [key: string]: unknown;
}
