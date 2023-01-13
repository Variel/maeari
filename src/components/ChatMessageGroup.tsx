import { Box, Image } from "@chakra-ui/react";
import { ChatMessageData } from "../types/ChatMessageData";
import ChatMessage from "./ChatMessage";

interface ChatMessageGroupProps {
  senderType: "me" | "other";
  senderImage?: string;
  children: ChatMessageData[];
}

const ChatMessageGroup: React.FC<ChatMessageGroupProps> = ({
  senderType,
  senderImage,
  children,
}) => {
  return (
    <Box
      display="flex"
      alignItems="flex-end"
    >
      {senderType !== "me" && senderImage && (
        <Image src={senderImage} borderRadius="full" boxSize="24px" mr={1} mb={3} />
      )}
      <Box flexGrow={1} display="flex">
        {children.map((msg, idx) => (
          <ChatMessage key={idx} senderType={msg.senderType} image={msg.image}>
            {msg.message}
          </ChatMessage>
        ))}
      </Box>
    </Box>
  );
};

export default ChatMessageGroup;
