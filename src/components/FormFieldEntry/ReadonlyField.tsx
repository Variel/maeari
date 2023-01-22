import { Input, Box } from "@chakra-ui/react";

interface ReadonlyFieldProps {
  value: string;
}

const ReadonlyField: React.FC<ReadonlyFieldProps> = ({ value }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      background="white"
      color="black"
      px={4}
      py={2}
      borderRadius={8}
    >
      <Box whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
        {value}
      </Box>
    </Box>
  );
};

export default ReadonlyField;
