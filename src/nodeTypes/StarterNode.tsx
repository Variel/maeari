import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Handle, NodeProps, Position, useEdges } from "reactflow";

const StarterNode: React.FC<NodeProps> = ({ id }) => {
  const edges = useEdges();
  const hasOutput = edges.find((edge) => edge.source === id);

  return (
    <Flex
      w={16}
      h={16}
      position="relative"
      borderRadius="full"
      backgroundColor="green.400"
      alignItems="center"
      justifyContent="center"
      color="white"
      shadow="base"
    >
      <Text>시작</Text>
      <Handle type="source" position={Position.Right} />

      {!hasOutput && (
        <Button
          position="absolute"
          size="xs"
          fontSize="10px"
          px={1}
          colorScheme="orange"
          right={-3}
          borderRadius="full"
          border="2px solid white"
        >
          <AddIcon />
        </Button>
      )}
    </Flex>
  );
};

export default StarterNode;
