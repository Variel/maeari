import { PlainChatMessageBase } from "./ChatMessage";
import { FormField } from "./FormField";

export type Scenario = {
  senderName: string;
  senderImage: string;
  steps: ScenarioStepBase[]
};

type ScenarioStepBase = {
  type: "choice" | "form",
  messages: PlainChatMessageBase[]
}

export type ChoiceStep = {
  type: "choice",
  options: ChoiceOption[]
} & ScenarioStepBase;

export type ChoiceOption = {
  message: string,
  step: number,
  log?: string
};

export type FormStep = {
  type: "form",
  fields: FormField[]
}