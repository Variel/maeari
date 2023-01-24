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
import useScenarioStep from "./hooks/useScenarioStep";
import useScenario from "./hooks/useScenario";

function App() {
  const scenario = useScenario();
  const { groups: messageGroups, addMessages } = useMessageGroup();
  const { step, setStep } = useScenarioStep(scenario, addMessages);

  const [formData, setFormData] = useState<Record<string, string | File>>({});

  const handleChoice = useCallback(
    (choice: number) => {
      if (!step || !isChoiceStep(step)) return;
      const nextStep = step.options[choice].nextStep;

      addMessages({
        message: step.options[choice].message,
        senderType: "me",
      });
      setStep(nextStep);
    },
    [step]
  );

  const handleFormSubmit = useCallback(
    (inputFormData: Record<string, string | File>) => {
      if (!step || !isFormStep(step)) return;

      const newFormData = {
        ...formData,
        ...inputFormData,
      };
      setFormData(newFormData);

      addMessages({
        senderType: "me",
        fields: step.fields,
        fieldData: inputFormData,
      });
      setStep(step.nextStep);
    },
    [step, formData]
  );

  const handleInputSubmit = useCallback(
    (message: string) => {
      if (!step || !isInputStep(step)) return;

      setFormData((formData) => ({
        ...formData,
        [step.name]: message,
      }));

      addMessages({
        message: message,
        senderType: "me",
      });
      setStep(step.nextStep);
    },
    [step]
  );

  return (
    (scenario && step !== undefined && (
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
            {isChoiceStep(step!) && (
              <ChoiceListView
                options={step.options.map((opt) => opt.message)}
                onChoice={handleChoice}
              />
            )}
            {isFormStep(step!) && (
              <FormView
                submitButton={step.submitButton}
                fields={step.fields}
                onSubmit={handleFormSubmit}
              />
            )}
            {isInputStep(step!) && (
              <InputView
                onSubmit={handleInputSubmit}
                placeholder={step.placeholder}
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
