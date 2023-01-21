import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { HTMLInputTypeAttribute, useCallback, useState } from "react";

interface TextFormFieldEntryProps {
  label: string;
  required: boolean;
  pattern?: string;
  validationMessage?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  value: string;
  onChange: (value?: string, file?: File) => void;
}

const TextFormFieldEntry: React.FC<TextFormFieldEntryProps> = ({
  label,
  required,
  pattern,
  validationMessage,
  placeholder,
  type,
  value,
  onChange,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      let hasError = false;

      if ((!newValue || newValue.length === 0) && required) {
        setErrorMessage(`필수 항목입니다`);
        hasError = true;
      }

      if (
        newValue?.length > 0 &&
        pattern &&
        !new RegExp(pattern).test(newValue)
      ) {
        setErrorMessage(validationMessage);
        hasError = true;
      }

      if (!hasError) {
        setErrorMessage(undefined);
      }

      onChange?.(newValue, undefined);
    },
    [onChange]
  );

  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormLabel>
        {label}
        {required ? (
          <Text as="span" color="red" ml={1}>
            *
          </Text>
        ) : (
          <Text as="span" color="gray" ml={1} fontSize="small">
            (선택)
          </Text>
        )}
      </FormLabel>
      <Input
        type={type ?? "text"}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        pattern={pattern}
      />
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextFormFieldEntry;
