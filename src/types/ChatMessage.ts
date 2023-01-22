import { FormField } from "./FormField";

type ChatMessageSenderBase = {
  senderType: "me" | "other";
};

export type OtherSenderChatMessage = {
  senderType: "other";
  senderImage?: string;
} & ChatMessageSenderBase;

export type MeSenderChatMessage = {
  senderType: "me";
} & ChatMessageSenderBase;

export type PlainChatMessageBase = {
  message: string;
  image?: string;
};

export type PlainChatMessage = PlainChatMessageBase &
  (OtherSenderChatMessage | MeSenderChatMessage);

export type FormChatMessage = {
  fields: FormField[];
  fieldData: Record<string, string | File>;
} & MeSenderChatMessage;

export type ChatMessage = PlainChatMessage | FormChatMessage;

export const isPlainChatMessage = (
  chatMessage: ChatMessage
): chatMessage is PlainChatMessage => {
  return (chatMessage as PlainChatMessage).message !== undefined;
};
