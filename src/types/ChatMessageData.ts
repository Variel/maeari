export type ChatMessageData = {
  senderType: "me" | "other",
  senderImage?: string,
  message: string,
  image?: string
};