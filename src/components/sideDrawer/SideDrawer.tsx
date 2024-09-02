import React from "react";
import Drawer from "@mui/joy/Drawer";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

interface Field {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  options?: string[];
}

interface ButtonConfig {
  text: string;
  variant: "solid" | "outlined" | "soft";
}

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  formConfig: {
    header: string;
    fields: Field[];
    buttons: ButtonConfig[];
  };
}

const SideDrawer: React.FC<SideDrawerProps> = ({
  open,
  onClose,
  formConfig,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());

  const renderField = (field: Field) => {
    switch (field.type) {
      case "input":
        return (
          <FormControl key={field.name} sx={{ mb: 2 }}>
            <FormLabel>{field.label}</FormLabel>
            <Input name={field.name} placeholder={field.placeholder} />
          </FormControl>
        );
      case "dropdown":
        return (
          <FormControl key={field.name} sx={{ mb: 2 }}>
            <FormLabel>{field.label}</FormLabel>
            <Select name={field.name} placeholder={field.label}>
              {field.options?.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </FormControl>
        );
      case "datepicker":
        return (
          <FormControl key={field.name} sx={{ mb: 2 }}>
            <FormLabel>{field.label}</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderLoading={() => <span>Loading...</span>}
              />
            </LocalizationProvider>
          </FormControl>
        );
      case "radio":
        return (
          <FormControl key={field.name} sx={{ mb: 2 }}>
            <FormLabel>{field.label}</FormLabel>
            <RadioGroup name={field.name}>
              {field.options?.map((option) => (
                <Radio key={option} value={option} label={option} />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case "checkbox":
        return (
          <FormControl key={field.name} sx={{ mb: 2 }}>
            <FormLabel>{field.label}</FormLabel>
            <Box>
              {field.options?.map((option) => (
                <Box
                  key={option}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Checkbox value={option} />
                  <Typography sx={{ ml: 1 }}>{option}</Typography>
                </Box>
              ))}
            </Box>
          </FormControl>
        );

      case "textarea":
        return (
          <FormControl key={field.name} sx={{ mb: 2 }}>
            <FormLabel>{field.label}</FormLabel>
            <Textarea
              name={field.name}
              placeholder={field.placeholder}
              minRows={3}
            />
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Drawer open={open} onClose={onClose} anchor="right" size="sm">
      <Box p={3}>
        <Typography gutterBottom>{formConfig.header}</Typography>
        <Box>{formConfig.fields.map((field) => renderField(field))}</Box>
        <Box display="flex" justifyContent="flex-end" gap={1} mt={3}>
          {formConfig.buttons.map((button, index) => (
            <Button key={index} variant={button.variant}>
              {button.text}
            </Button>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
