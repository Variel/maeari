import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import ReadonlyField from "./ReadonlyField";

interface SelectFormFieldEntryProps {
  value: string;
  onChange?: (value?: string, file?: File) => void;
  label: string;
  required: boolean;
  options: string[];
  placeholder?: string;
  readonly?: boolean;
}

const SelectFormFieldEntry: React.FC<SelectFormFieldEntryProps> = ({
  value,
  onChange,
  label,
  required,
  options,
  placeholder,
  readonly,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;

      if (!newValue && required) {
        setErrorMessage("필수 항목입니다");
      } else {
        setErrorMessage(undefined);
      }

      onChange?.(newValue, undefined);
    },
    []
  );

  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormLabel>
        {label}
        {readonly ? null : (
          <>
            {required ? (
              <Text as="span" color="red" ml={1}>
                *
              </Text>
            ) : (
              <Text as="span" color="gray" ml={1} fontSize="small">
                (선택)
              </Text>
            )}
          </>
        )}
      </FormLabel>
      {readonly ? (
        <ReadonlyField value={value} />
      ) : (
        <Select placeholder={placeholder} value={value} onChange={handleChange}>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </Select>
      )}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default SelectFormFieldEntry;
