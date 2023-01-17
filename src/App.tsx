import { Box, Button } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ChatMessageView from "./components/ChatMessageView";
import ChatMessageGroup from "./components/ChatMessageGroup";
import ChoiceList from "./components/ChoiceList";
import { Route, BrowserRouter, useParams } from "react-router-dom";
import { Scenario } from "./types/Scenario";
import { ChatMessage, PlainChatMessageBase } from "./types/ChatMessage";

const buildChatMessageGroups: (
  chatMessages?: ChatMessage[]
) => ChatMessage[][] = (chatMessages?: ChatMessage[]) => {
  const groups: ChatMessage[][] = [];
  let lastGroup: ChatMessage[];

  if (!chatMessages) return [];

  chatMessages.forEach((msg) => {
    if (groups.length === 0) {
      lastGroup = [msg];
      groups.push(lastGroup);
      return;
    }

    if (lastGroup[lastGroup.length - 1].senderType !== msg.senderType) {
      lastGroup = [msg];
      groups.push(lastGroup);
      return;
    }

    lastGroup.push(msg);
  });

  return groups;
};

function App() {
  const { scenarioId } = useParams();
  const [scenario, setScenario] = useState<Scenario>();
  const [currentStep, _setCurrentStep] = useState<number>();
  const [messages, setMessages] = useState<ChatMessage[]>();

  const toChatMessage: (plainChatMessage: PlainChatMessageBase) => ChatMessage =
    useCallback(
      (plainChatMessage: PlainChatMessageBase) => {
        return { ...plainChatMessage, senderType: "other" };
      },
      [scenario]
    );

  const setCurrentStep = useCallback((step: number) => {
    if (!scenario?.steps[step]) return;
    if (step === currentStep) return;

    _setCurrentStep(step);
    setMessages((messages) => [
      ...(messages || []),
      ...scenario.steps[step].messages.map((msg) => toChatMessage(msg)),
    ]);
  }, [scenario, _setCurrentStep]);

  useEffect(() => {
    (async () => {
      const scenarioData = (await fetch(
        `/static/scenarios/${scenarioId}.json`
      ).then((res) => res.json())) as Scenario;
      setScenario(scenarioData);
    })();
  }, [scenarioId]);

  useEffect(() => {
    if (!scenario) return;

    setCurrentStep(0);
  }, [scenario]);

  const chatMessageGroups = useMemo(
    () => buildChatMessageGroups(messages),
    [messages]
  );
  console.log(chatMessageGroups);

  return (
    (scenario && currentStep !== undefined && (
      <>
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
            <ChatMessageGroup senderType="me">
              {[
                {
                  senderType: "me",
                  message: "asdf",
                },
              ]}
            </ChatMessageGroup>
            <ChoiceList
              options={[
                "어머 그건 선택할 수 없어요",
                "정말 그걸 하시게썽요?",
                "후회 하지 않을건가요?",
                "qwerfw",
              ]}
              onChoice={(e) => console.log(e)}
            />
          </Box>
        </div>
      </>
    )) ||
    null
  );
}

export default App;
