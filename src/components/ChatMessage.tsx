import { Box, Card, CardBody, Image } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ChatMessageProps {
  senderType: "me" | "other";
  children: string;
  image?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  senderType,
  children,
  image,
}) => {
  return (
    <Card
      variant="outline"
      overflow="hidden"
      maxW="300px"
      backgroundColor={senderType === "me" ? undefined : "#EDF2F7"}
      ml={senderType === "me" ? "auto" : undefined}
      my={2}
    >
      {image && (
        <Image objectFit="cover" width="100%" maxH="200px" src={image} alt="" />
      )}
      <CardBody px={2.5} py={1} whiteSpace="pre-wrap">{children}</CardBody>
    </Card>
  );
};

export default ChatMessage;
