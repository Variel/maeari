import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Position,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import nodeTypes from "./nodeTypes";

const nodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    type: "starter",
    data: null,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "2",
    position: { x: 300, y: 100 },
    type: "choice",
    data: null,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

const edges = [{ id: "1-2", source: "1", target: "2" }];

const Editor: React.FC = () => {
  const [reactFlow, setReactFlow] = useState<ReactFlowInstance>();

  return (
    <Box height={"100vh"}>
      <ReactFlow
        onInit={(instance) => setReactFlow(instance)}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        fitView
        panOnScroll
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};

export default Editor;
