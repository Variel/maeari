import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import ChatMessage from "./components/ChatMessage";
import ChatMessageGroup from "./components/ChatMessageGroup";
import ChoiceList from "./components/ChoiceList";

function App() {
  return (
    <div className="App">
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
        <ChoiceList options={['어머 그건 선택할 수 없어요','정말 그걸 하시게썽요?','후회 하지 않을건가요?','qwerfw']} onChoice={(e) => console.log(e)}/>
      </Box>
    </div>
  );
}

export default App;
