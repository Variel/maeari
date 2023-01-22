import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { useCallback } from "react";
import ReadonlyField from "./ReadonlyField";

interface FileFormFieldEntryProps {
  value: string;
  onChange?: (value?: string, file?: File) => void;
  label: string;
  required: boolean;
  accept: string;
  readonly?: boolean;
}

const FileFormFieldEntry: React.FC<FileFormFieldEntryProps> = ({
  value,
  onChange,
  label,
  required,
  accept,
  readonly,
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.item(0) ?? undefined;

    onChange?.(undefined, newFile);

    e.target.value = e.target.defaultValue;
  }, []);

  const clearFile = useCallback(() => {
    onChange?.(undefined, undefined);
  }, []);

  return (
    <FormControl>
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
        <Flex alignItems="center">
          {value && (
            <Tag
              colorScheme="teal"
              variant="solid"
              sx={{ flexShrink: 0 }}
              mr={1}
              maxW="60%"
            >
              <TagLabel>{value}</TagLabel>
              <TagCloseButton onClick={clearFile} />
            </Tag>
          )}
          <Button as="label" color="gray" w={"100%"} textAlign="center">
            파일 선택
            <input
              type="file"
              onChange={handleChange}
              accept={accept}
              style={{ display: "none" }}
            />
          </Button>
        </Flex>
      )}
    </FormControl>
  );
};

export default FileFormFieldEntry;
