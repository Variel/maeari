import { Box, Button, Card, CardBody, Input } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { SendIcon } from "./SendIcon";

interface InputViewProps {
  placeholder?: string;
  onSubmit: (message: string) => void;
}

const InputView: React.FC<InputViewProps> = ({ onSubmit, placeholder }) => {
  const [value, setValue] = useState<string>("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      onSubmit?.(value);
    },
    [value]
  );

  return (
    <Box position="fixed" bottom={2} left={4} right={4}>
      <Card variant="outline" shadow="md" backgroundColor="white">
        <CardBody px={2} py={2}>
          <form onSubmit={handleSubmit} style={{ display: "flex" }}>
            <Input
              px={1}
              variant="unstyled"
              placeholder={placeholder}
              onChange={handleChange}
            />
            <Button
              type="submit"
              colorScheme="blue"
              variant="solid"
              fontSize={24}
              size="sm"
            >
              <SendIcon />
            </Button>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};

export default InputView;
