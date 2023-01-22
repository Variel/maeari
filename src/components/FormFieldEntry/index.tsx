import { FormField } from "../../types/FormField";
import FileFormFieldEntry from "./FileFormFieldEntry";
import SelectFormFieldEntry from "./SelectFormFieldEntry";
import TextFormFieldEntry from "./TextFormFieldEntry";

interface FormFieldEntryProps {
  field: FormField;
  value: string;
  onChange?: (value?: string, file?: File) => void;
  readonly?: boolean;
}
const FormFieldEntry: React.FC<FormFieldEntryProps> = ({
  field,
  value,
  onChange,
  readonly,
}) => {
  switch (field.type) {
    case "email":
      return (
        <TextFormFieldEntry
          value={value}
          onChange={onChange}
          label={field.label}
          required={field.required}
          pattern={
            "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
          }
          validationMessage={"올바른 이메일을 적어주세요"}
          type="email"
          readonly={readonly}
        />
      );
    case "text":
      return (
        <TextFormFieldEntry
          value={value}
          onChange={onChange}
          label={field.label}
          required={field.required}
          pattern={field.pattern}
          placeholder={field.placeholder}
          validationMessage={field.validationMessage}
          readonly={readonly}
        />
      );
    case "select":
      return (
        <SelectFormFieldEntry
          value={value}
          onChange={onChange}
          label={field.label}
          required={field.required}
          options={field.options}
          placeholder={field.placeholder}
          readonly={readonly}
        />
      );
    case "file":
      return (
        <FileFormFieldEntry
          onChange={onChange}
          label={field.label}
          accept={field.accept}
          required={field.required}
          value={value}
          readonly={readonly}
        />
      );
    default:
      return null;
  }
};

export default FormFieldEntry;
