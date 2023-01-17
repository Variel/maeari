import { Box, Card, CardBody, Image } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ChatMessageViewProps {
  senderType: "me" | "other";
  children: string;
  image?: string;
}

const ChatMessageView: React.FC<ChatMessageViewProps> = ({
  senderType,
  children,
  image,
}) => {
  return (
    <Card
      variant="outline"
      overflow="hidden"
      maxW="300px"
      backgroundColor={senderType === "me" ? "#3182CE" : "#EDF2F7"}
      color={senderType === "me" ? "white" : "inherit"}
      border="none"
      borderRadius={"16px"}
      ml={senderType === "me" ? "auto" : undefined}
      my={2}
    >
      {image && (
        <Image objectFit="cover" width="100%" maxH="200px" src={image} alt="" />
      )}
      <CardBody px={3} py={1} whiteSpace="pre-wrap">{children}</CardBody>
    </Card>
  );
};

export default ChatMessageView;
