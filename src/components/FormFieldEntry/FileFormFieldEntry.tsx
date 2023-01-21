import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useCallback } from "react";

interface FileFormFieldEntryProps {
  value: string;
  onChange: (value?: string, file?: File) => void;
  label: string;
  required: boolean;
  accept: string;
}

const FileFormFieldEntry: React.FC<FileFormFieldEntryProps> = ({value, onChange, label, required, accept}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFile = e.target.files?.item(0) ?? undefined;

      onChange?.(undefined, newFile);
    },
    []
  );

  return (
    <FormControl>
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
      <Input type="file" onChange={handleChange} accept={accept}/>
    </FormControl>
  );
};

export default FileFormFieldEntry;
