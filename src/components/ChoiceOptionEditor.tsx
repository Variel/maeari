import { CloseIcon } from "@chakra-ui/icons";
import { Card, CardBody, Flex, Input, Button } from "@chakra-ui/react";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";

interface ChoiceOptionViewProps {
  index: number;
  message: string;
  onChange: (idx: number, message: string | undefined) => void;
}

const ChoiceOptionView: React.FC<ChoiceOptionViewProps> = ({
  index,
  message,
  onChange,
}) => {
  const handleChangeMessage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(index, e.target.value);
    },
    [onChange]
  );

  return (
    <Card size="sm" variant="outline" position="relative" mb={1}>
      <CardBody>
        <Flex>
          <Input
            variant="unstyled"
            placeholder="선택지 메시지"
            required
            value={message}
            onChange={handleChangeMessage}
          />
          <Button
            size="xs"
            borderRadius="full"
            padding={0}
            colorScheme="red"
            ml={2}
            onClick={() => onChange(index, undefined)}
          >
            <CloseIcon />
          </Button>
        </Flex>
        <Handle
          id={`choice-${index}`}
          type="source"
          position={Position.Right}
        />
      </CardBody>
    </Card>
  );
};

interface ChoiceOptionEditorProps {
  options: string[];
  onChange: (options: string[]) => void;
}

const ChoiceOptionEditor: React.FC<ChoiceOptionEditorProps> = ({
  options,
  onChange,
}) => {
  const handleChangeOption = useCallback(
    (idx: number, message: string | undefined) => {
      if (message) {
        onChange([
          ...options.slice(0, idx),
          message,
          ...options.slice(idx + 1),
        ]);
      } else {
        onChange([...options.slice(0, idx), ...options.slice(idx + 1)]);
      }
    },
    [onChange, options]
  );

  return (
    <>
      {options.map((option, idx) => (
        <ChoiceOptionView
          key={idx}
          index={idx}
          message={option}
          onChange={handleChangeOption}
        />
      ))}
    </>
  );
};

export default ChoiceOptionEditor;
