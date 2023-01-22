import { Box, Button } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ChatMessageView from "./components/ChatMessageView";
import ChatMessageGroup from "./components/ChatMessageGroup";
import ChoiceListView from "./components/ChoiceListView";
import { Route, BrowserRouter, useParams } from "react-router-dom";
import {
  ChoiceStep,
  InputStep,
  isChoiceStep,
  isFormStep,
  isInputStep,
  Scenario,
} from "./types/Scenario";
import {
  ChatMessage,
  OtherSenderChatMessage,
  PlainChatMessageBase,
} from "./types/ChatMessage";
import { useMessageGroup } from "./hooks/useMessageGroup";
import FormView from "./components/FormView";
import InputView from "./components/InputView";

function App() {
  const { scenarioId } = useParams();
  const [scenario, setScenario] = useState<Scenario>();
  const [currentStep, _setCurrentStep] = useState<number>();
  const currentStepValue = scenario?.steps[currentStep ?? 0];

  const { groups: messageGroups, addMessages } = useMessageGroup();

  const [formData, setFormData] = useState<Record<string, string | File>>({});

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
      if (!currentStepValue || !isChoiceStep(currentStepValue)) return;
      const nextStep = currentStepValue.options[choice].step;

      addMessages({
        message: currentStepValue.options[choice].message,
        senderType: "me",
      });
      setCurrentStep(nextStep);
    },
    [currentStepValue]
  );

  const handleFormSubmit = useCallback(
    (inputFormData: Record<string, string | File>) => {
      if (!currentStepValue || !isFormStep(currentStepValue)) return;

      const newFormData = {
        ...formData,
        ...inputFormData,
      };
      setFormData(newFormData);

      addMessages({
        senderType: "me",
        fields: currentStepValue.fields,
        fieldData: inputFormData,
      });
      setCurrentStep(currentStepValue.step);
    },
    [currentStepValue, formData]
  );

  const handleInputSubmit = useCallback(
    (message: string) => {
      if (!currentStepValue || !isInputStep(currentStepValue)) return;

      setFormData((formData) => ({
        ...formData,
        [currentStepValue.name]: message,
      }));

      addMessages({
        message: message,
        senderType: "me",
      });
      setCurrentStep(currentStepValue.step);
    },
    [currentStepValue]
  );

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

  useEffect(() => console.log("formData", formData), [formData]);

  return (
    (scenario && currentStep !== undefined && (
      <>
        <div className="App">
          <Box p={4} mb={58}>
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
                onSubmit={handleFormSubmit}
              />
            )}
            {isInputStep(currentStepValue!) && (
              <InputView
                onSubmit={handleInputSubmit}
                placeholder={currentStepValue.placeholder}
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
