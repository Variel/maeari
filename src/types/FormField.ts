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
  placeholder?: string;
} & FormFieldBase;

export type EmailFormField = {
  type: "email";
  placeholder?: string;
} & FormFieldBase;

export type FileFormField = {
  type: "file";
  accept: string;
} & FormFieldBase;

export type SelectFormField = {
  type: "select";
  options: string[];
  placeholder: string;
} & FormFieldBase;

export type FormField =
  | TextFormField
  | EmailFormField
  | FileFormField
  | SelectFormField;
