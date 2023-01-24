import { useCallback, useEffect, useState } from "react";
import { ChatMessage, PlainChatMessageBase } from "../types/ChatMessage";
import { Scenario } from "../types/Scenario";

const toChatMessage: (plainChatMessage: PlainChatMessageBase) => ChatMessage = (
  plainChatMessage: PlainChatMessageBase
) => {
  return { ...plainChatMessage, senderType: "other" };
};

const useScenarioStep = (
  scenario: Scenario | undefined,
  addMessages: (messages: ChatMessage[] | ChatMessage) => void
) => {
  const [currentStep, setCurrentStep] = useState<number>();

  const setStep = useCallback(
    (nextStep: number) => {
      if (nextStep === currentStep) return;
      if (!scenario?.steps[nextStep]) return;

      setCurrentStep(nextStep);

      const messagesToAdd = scenario.steps[nextStep].messages.map((msg) =>
        toChatMessage(msg)
      );
      addMessages(messagesToAdd);
    },
    [scenario]
  );

  useEffect(() => {
    if (!scenario) return;

    setStep(0);
  }, [scenario]);

  return {
    step: scenario?.steps[currentStep ?? 0],
    setStep,
  };
};

export default useScenarioStep;
