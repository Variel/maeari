import { Box, Button, Card, CardBody } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { FormField } from "../types/FormField";
import FormFieldEntry from "./FormFieldEntry";

interface FormViewProps {
  submitButton: string;
  fields: FormField[];
  onSubmit: (formData: FormData) => void;
}

type FormFieldData = {
  value?: string;
  file?: File;
};

const FormView: React.FC<FormViewProps> = ({
  fields,
  onSubmit,
  submitButton,
}) => {
  const [fieldData, setFieldData] = useState<Record<string, FormFieldData>>({});

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData();
  }, []);

  const handleChangeField = useCallback(
    (name: string, value?: string, file?: File) => {
      setFieldData((fieldData) => ({
        ...fieldData,
        [name]: { value: file?.name ?? value, file: file },
      }));
    },
    []
  );

  return (
    <Card
      variant="outline"
      overflow="hidden"
      maxW="300px"
      borderRadius={"16px"}
      ml={"auto"}
      my={1}
    >
      <CardBody>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <Box mb={4} key={field.name}>
              <FormFieldEntry
                field={field}
                value={fieldData[field.name]?.value ?? ""}
                onChange={(value, file) =>
                  handleChangeField(field.name, value, file)
                }
              />
            </Box>
          ))}
          <Button variant="solid" colorScheme="blue" size="sm" w="100%">
            {submitButton}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default FormView;
