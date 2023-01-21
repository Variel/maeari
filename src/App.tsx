import { Box, Button } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ChatMessageView from "./components/ChatMessageView";
import ChatMessageGroup from "./components/ChatMessageGroup";
import ChoiceListView from "./components/ChoiceListView";
import { Route, BrowserRouter, useParams } from "react-router-dom";
import {
  ChoiceStep,
  isChoiceStep,
  isFormStep,
  Scenario,
} from "./types/Scenario";
import {
  ChatMessage,
  OtherSenderChatMessage,
  PlainChatMessageBase,
} from "./types/ChatMessage";
import { useMessageGroup } from "./hooks/useMessageGroup";
import FormView from "./components/FormView";

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
  const { groups: messageGroups, addMessages } = useMessageGroup();

  const currentStepValue = scenario?.steps[currentStep ?? 0];

  const toChatMessage: (plainChatMessage: PlainChatMessageBase) => ChatMessage =
    useCallback(
      (plainChatMessage: PlainChatMessageBase) => {
        return { ...plainChatMessage, senderType: "other" };
      },
      [scenario]
    );

  const setCurrentStep = useCallback(
    (step: number) => {
      if (!scenario?.steps[step]) return;
      if (step === currentStep) return;

      _setCurrentStep(step);

      const messagesToAdd = scenario.steps[step].messages.map((msg) =>
        toChatMessage(msg)
      );
      addMessages(messagesToAdd);
    },
    [scenario, _setCurrentStep]
  );

  const handleChoice = useCallback(
    (choice: number) => {
      const currentStep = currentStepValue as ChoiceStep;
      const nextStep = currentStep.options[choice].step;

      addMessages({
        message: currentStep.options[choice].message,
        senderType: "me",
      });

      setCurrentStep(nextStep);
    },
    [currentStepValue]
  );

  const handleSubmit = useCallback((formData: FormData) => {
    
  }, []);

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

  return (
    (scenario && currentStep !== undefined && (
      <>
        <div className="App">
          <Box p={4}>
            {messageGroups.map((group, groupIndex) => (
              <ChatMessageGroup
                key={`group-${groupIndex}`}
                senderType={group[0].senderType}
                senderImage={(group[0] as OtherSenderChatMessage).senderImage}
              >
                {group}
              </ChatMessageGroup>
            ))}
            {isChoiceStep(currentStepValue!) && (
              <ChoiceListView
                options={currentStepValue.options.map((opt) => opt.message)}
                onChoice={handleChoice}
              />
            )}
            {isFormStep(currentStepValue!) && (
              <FormView
                submitButton={currentStepValue.submitButton}
                fields={currentStepValue.fields}
                onSubmit={handleSubmit}
              />
            )}
          </Box>
        </div>
      </>
    )) ||
    null
  );
}

export default App;
