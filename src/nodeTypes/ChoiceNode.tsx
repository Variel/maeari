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
import { Handle, NodeProps, Position, useEdges, useReactFlow } from "reactflow";
import ChoiceOptionEditor from "../components/ChoiceOptionEditor";
import MessageListEditor from "../components/MessageListEditor";
import { PlainChatMessageBase } from "../types/ChatMessage";

interface ChoiceNodeProps {
  options: string[];
  messages: PlainChatMessageBase[];
}

const ChoiceNode: React.FC<NodeProps<ChoiceNodeProps>> = ({
  id,
  data: { messages, options },
}) => {
  const reactflow = useReactFlow();
  const edges = reactflow.getEdges();

  const hasOutput = edges.find((edge) => edge.source === id);

  const handleMessageListChange = useCallback(
    (messages: PlainChatMessageBase[]) => {
      reactflow.setNodes((nodes) =>
        nodes?.map((node) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  messages,
                },
              }
            : node
        )
      );
    },
    []
  );

  const handleOptionListChange = useCallback(
    (options: string[]) => {
      reactflow.setNodes((nodes) =>
        nodes?.map((node) => {
          if (node.id === id) {
            node.data = {
              ...node.data,
              options: [...options],
            };
          }

          return node;
        })
      );
    },
    [reactflow]
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
            onClick={() =>
              handleMessageListChange([...messages, { message: "" }])
            }
          >
            <AddIcon />
          </Button>
        </Flex>

        <Divider my={4} />

        <Text mb={2}>선택지 목록</Text>

        <ChoiceOptionEditor
          options={options}
          onChange={handleOptionListChange}
        />

        <Flex justifyContent="center" mt={4}>
          <Button
            size="sm"
            borderRadius="full"
            padding={0}
            colorScheme="blue"
            onClick={() => handleOptionListChange([...options, ""])}
          >
            <AddIcon />
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ChoiceNode;
