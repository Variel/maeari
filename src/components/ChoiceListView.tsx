import { Box, Button } from "@chakra-ui/react";
import { useCallback } from "react";

interface ChoiceButtonProps {
  children: string;
  onClick: () => void
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ children, onClick }) => {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return <Button variant="outline" size="sm" ml={1} mb={1} borderRadius="16px" onClick={() => handleClick()}>{children}</Button>;
};

interface ChoiceListProps {
  options: string[];
  onChoice: (choice: number) => void;
}

const ChoiceListView: React.FC<ChoiceListProps> = ({ options, onChoice }) => {
  return (
    <Box display="flex" justifyContent="flex-end" flexWrap="wrap" mt={2} mb={1}>
      {options.map((option, idx) => (
        <ChoiceButton key={idx} onClick={() => onChoice(idx)}>
          {option}
        </ChoiceButton>
      ))}
    </Box>
  );
};

export default ChoiceListView;
