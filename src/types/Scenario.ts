import { PlainChatMessageBase } from "./ChatMessage";
import { FormField } from "./FormField";

export type Scenario = {
  senderName: string;
  senderImage: string;
  steps: ScenarioStep[];
};

type ScenarioStepBase = {
  type: "choice" | "form";
  messages: PlainChatMessageBase[];
};

export type ChoiceStep = {
  type: "choice";
  options: ChoiceOption[];
} & ScenarioStepBase;

export type ChoiceOption = {
  message: string;
  step: number;
};

export type FormStep = {
  type: "form";
  fields: FormField[];
  submitButton: string;
} & ScenarioStepBase;

export type ScenarioStep = ChoiceStep | FormStep;

export const isChoiceStep = (step: ScenarioStepBase): step is ChoiceStep => {
  return (step as ChoiceStep).options !== undefined;
};

export const isFormStep = (step: ScenarioStepBase): step is FormStep => {
  return (step as FormStep).fields !== undefined;
};
