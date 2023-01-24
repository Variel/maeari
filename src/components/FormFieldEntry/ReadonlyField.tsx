import { Input, Box } from "@chakra-ui/react";

interface ReadonlyFieldProps {
  value: string;
}

const ReadonlyField: React.FC<ReadonlyFieldProps> = ({ value }) => {
  return (
    <Box
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
      color="white"
      fontWeight="bold"
    >
      {value}
    </Box>
  );
};

export default ReadonlyField;
