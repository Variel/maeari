import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { Handle, NodeProps, Position, useEdges } from "reactflow";
import MessageListEditor from "../components/MessageListEditor";
import { PlainChatMessageBase } from "../types/ChatMessage";

interface ChoiceOptionViewProps {
  index: number;
  message: string;
}

const ChoiceOptionView: React.FC<ChoiceOptionViewProps> = ({
  index,
  message,
}) => {
  return (
    <Card size="sm" variant="outline" position="relative">
      <CardBody>
        <Flex>
          <Input variant="unstyled" placeholder="선택지 메시지" required />
          <Button
            size="xs"
            borderRadius="full"
            padding={0}
            colorScheme="red"
            ml={2}
          >
            <CloseIcon />
          </Button>
        </Flex>
        <Handle
          id={`choice-${index}`}
          type="source"
          position={Position.Right}
        />
      </CardBody>
    </Card>
  );
};

const ChoiceNode: React.FC<NodeProps> = ({ id }) => {
  const edges = useEdges();
  const hasOutput = edges.find((edge) => edge.source === id);

  const [messages, setMessages] = useState<PlainChatMessageBase[]>([]);

  const handleMessageListChange = useCallback(
    (messages: PlainChatMessageBase[]) => {
      setMessages(messages);
    },
    []
  );

  return (
    <Card backgroundColor="white">
      <CardBody minWidth="300px">
        <Handle type="target" position={Position.Left} />
        <Text fontWeight="bold" fontSize="20px" mb={2}>
          선택지 스텝
        </Text>
        <Text mb={2}>보낼 안내 메시지</Text>

        <MessageListEditor
          messages={messages}
          onChange={handleMessageListChange}
        />

        <Flex justifyContent="center" mt={4}>
          <Button
            size="sm"
            borderRadius="full"
            padding={0}
            colorScheme="blue"
            onClick={() => setMessages([...messages, { message: "" }])}
          >
            <AddIcon />
          </Button>
        </Flex>

        <Divider my={4} />

        <Text mb={2}>선택지 목록</Text>

        <ChoiceOptionView index={1} message="푸힝힝" />

        <Flex justifyContent="center" mt={4}>
          <Button size="sm" borderRadius="full" padding={0} colorScheme="blue">
            <AddIcon />
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ChoiceNode;
