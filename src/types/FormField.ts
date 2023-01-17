export type FormFieldBase = {
  type: "text" | "email" | "select" | "file";
  name: string;
  label: string;
  required: boolean;
};

export type TextFormField = {
  type: "text";
  pattern?: string;
  validationMessage?: string;
} & FormFieldBase;

export type EmailFormField = {
  type: "email";
};

export type FileFormField = {
  type: "file";
  accept: string;
} & FormFieldBase;

export type SelectFormField = {
  type: "select";
  options: string[];
};

export type FormField =
  | TextFormField
  | EmailFormField
  | FileFormField
  | SelectFormField;
