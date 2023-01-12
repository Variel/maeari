import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import ChatMessage from "./components/ChatMessage";
import ChatMessageGroup from "./components/ChatMessageGroup";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Button onClick={() => setCount((c) => c + 1)}>{count}</Button>
      <Box p={4}>
        <ChatMessageGroup
          senderImage="https://picsum.photos/200/200"
          senderType="other"
        >
          {[
            {
              senderType: "other",
              senderImage: "https://picsum.photos/400/200",
              message: "asdf",
            },
          ]}
        </ChatMessageGroup>
        <ChatMessageGroup
          senderType="me"
        >
          {[
            {
              senderType: "me",
              senderImage: "https://picsum.photos/400/200",
              message: "asdf",
            },
          ]}
        </ChatMessageGroup>
      </Box>
    </div>
  );
}

export default App;
