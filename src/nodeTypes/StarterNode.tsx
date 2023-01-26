import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import {
  applyNodeChanges,
  Handle,
  NodeProps,
  Position,
  useEdges,
  useReactFlow,
} from "reactflow";
import randomId from "../helpers/randomId";

const StarterNode: React.FC<NodeProps> = ({ id, xPos, yPos }) => {
  const reactflow = useReactFlow();
  const edges = reactflow.getEdges();

  const hasOutput = edges.find((edge) => edge.source === id);

  const handleCreateStep = useCallback(() => {
    const newNode = {
      id: randomId(),
      position: { x: xPos + 200, y: yPos - 95 },
      type: "choice",
      data: { messages: [], options: [] },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };

    const newEdge = {
      id: `${id}-${newNode.id}`,
      source: id,
      target: newNode.id,
    };

    reactflow.setNodes((nodes) => [...nodes, newNode]);
    reactflow.setEdges((edges) => [...edges, newEdge]);

    setTimeout(() => {
      const thisNode = reactflow.getNode(id);
      const otherNode = reactflow.getNode(newNode.id);

      const x = Math.min(thisNode?.position.x ?? 0, otherNode?.position.x ?? 0);
      const y = Math.min(thisNode?.position.y ?? 0, otherNode?.position.y ?? 0);
      const rect = {
        x,
        y,
        width:
          Math.max(
            (thisNode?.position.x ?? 0) + (thisNode?.width ?? 0),
            (otherNode?.position.x ?? 0) + (otherNode?.width ?? 0)
          ) - x,
        height:
          Math.max(
            (thisNode?.position.y ?? 0) + (thisNode?.height ?? 0),
            (otherNode?.position.y ?? 0) + (otherNode?.height ?? 0)
          ) - y,
      };
      reactflow.fitBounds(rect, { duration: 500 });
    }, 10);
  }, [xPos, yPos]);

  console.log("output", hasOutput);

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
          onClick={handleCreateStep}
        >
          <AddIcon />
        </Button>
      )}
    </Flex>
  );
};

export default StarterNode;
