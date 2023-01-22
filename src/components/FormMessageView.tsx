import { Box, Card, CardBody } from "@chakra-ui/react";
import { FormField } from "../types/FormField";
import FormFieldEntry from "./FormFieldEntry";

interface FormMessageViewProps {
  fields: FormField[];
  fieldData: Record<string, string | File>;
}

const FormMessageView: React.FC<FormMessageViewProps> = ({
  fields,
  fieldData,
}) => {
  console.log("fields", fields);
  return (
    <Card
      variant="outline"
      overflow="hidden"
      maxW="300px"
      borderRadius={"16px"}
      ml={"auto"}
      my={1}
      color="white"
      background="blue.500"
    >
      <CardBody sx={{ "> :last-child": { marginBottom: 0 } }}>
        {fields
          .filter((field) => {
            console.log(field, fieldData);
            return fieldData[field.name];
          })
          .map((field) => (
            <Box mb={4} key={field.name}>
              <FormFieldEntry
                field={field}
                value={
                  (fieldData[field.name] as File)?.name ??
                  fieldData[field.name] ??
                  ""
                }
                readonly
              />
            </Box>
          ))}
      </CardBody>
    </Card>
  );
};

export default FormMessageView;
