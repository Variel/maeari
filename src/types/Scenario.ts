import { PlainChatMessageBase } from "./ChatMessage";
import { FormField } from "./FormField";

export type Scenario = {
  senderName: string;
  senderImage: string;
  steps: ScenarioStep[];
};

type ScenarioStepBase = {
  type: "choice" | "form" | "input";
  messages: PlainChatMessageBase[];
};

export type ChoiceStep = {
  type: "choice";
  options: ChoiceOption[];
  action: "submit";
} & ScenarioStepBase;

export type ChoiceOption = {
  message: string;
  nextStep: number;
};

export type FormStep = {
  type: "form";
  fields: FormField[];
  submitButton: string;
  nextStep: number;
} & ScenarioStepBase;

export type InputStep = {
  type: "input";
  placeholder: string;
  nextStep: number;
  name: string;
} & ScenarioStepBase;

export type ScenarioStep = ChoiceStep | FormStep | InputStep;

export const isChoiceStep = (step: ScenarioStepBase): step is ChoiceStep => {
  return (step as ChoiceStep).options !== undefined;
};

export const isFormStep = (step: ScenarioStepBase): step is FormStep => {
  return (step as FormStep).fields !== undefined;
};

export const isInputStep = (step: ScenarioStepBase): step is InputStep => {
  return step.type === "input";
};
