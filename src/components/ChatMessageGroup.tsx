import { Box, Image } from "@chakra-ui/react";
import { ChatMessage, isPlainChatMessage } from "../types/ChatMessage";
import ChatMessageView from "./ChatMessageView";
import FormMessageView from "./FormMessageView";

interface ChatMessageGroupProps {
  senderType: "me" | "other";
  senderImage?: string;
  children: ChatMessage[];
}

const ChatMessageGroup: React.FC<ChatMessageGroupProps> = ({
  senderType,
  senderImage,
  children,
}) => {
  return (
    <Box display="flex" alignItems="flex-end">
      {senderType !== "me" && senderImage && (
        <Image
          src={senderImage}
          borderRadius="full"
          boxSize="24px"
          mr={1}
          mb={3}
        />
      )}
      <Box flexGrow={1} display="flex" flexDirection="column">
        {children.map((msg, idx) => {
          if (isPlainChatMessage(msg)) {
            // Plain message
            return (
              <ChatMessageView
                key={idx}
                senderType={msg.senderType}
                image={msg.image}
              >
                {msg.message}
              </ChatMessageView>
            );
          } else {
            // Form message
            return (
              <FormMessageView
                key={idx}
                fields={msg.fields}
                fieldData={msg.fieldData}
              />
            );
          }
        })}
      </Box>
    </Box>
  );
};

export default ChatMessageGroup;
