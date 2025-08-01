export interface ChatInfo {
  id: number;
  name: string;
  date: string;
}

export interface Message {
  senderId: number;
  receiverId: number;
  content: string;
  date: string;
}
export type ChatInfoList = ChatInfo[];
