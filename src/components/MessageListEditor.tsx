import {
  Box,
  Card,
  CardBody,
  Editable,
  EditableTextarea,
  Image,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { ChatMessage, PlainChatMessageBase } from "../types/ChatMessage";

interface MessageListEditorProps {
  messages: PlainChatMessageBase[];
  onChange: (messages: PlainChatMessageBase[]) => void;
}

const MessageListEditor: React.FC<MessageListEditorProps> = ({
  messages,
  onChange,
}) => {
  const handleChangeValue = useCallback(
    (index: number, message: string) => {
      if (!message) {
        onChange([...messages.slice(0, index), ...messages.slice(index + 1)]);
      } else {
        const newMessages = [...messages];
        newMessages[index].message = message;

        onChange(newMessages);
      }
    },
    [messages, onChange]
  );

  return (
    <Box>
      {messages.map((msg, idx) => (
        <Card
          key={idx}
          variant="outline"
          overflow="hidden"
          maxW="300px"
          backgroundColor={"gray.100"}
          border="none"
          borderRadius={"16px"}
          my={1}
        >
          {msg.image && (
            <Image
              objectFit="cover"
              width="100%"
              maxH="200px"
              src={msg.image}
              alt=""
            />
          )}
          <CardBody px={3} py={1}>
            <Textarea
              py={0}
              value={msg.message}
              variant="unstyled"
              resize="none"
              onChange={(e) => {
                e.target.style.height = "0";
                e.target.style.height = `${e.target.scrollHeight}px`;
                handleChangeValue(idx, e.target.value);
              }}
              rows={1}
            ></Textarea>
          </CardBody>
        </Card>
      ))}
    </Box>
  );
};

export default MessageListEditor;
