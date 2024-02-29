import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import ButtonBase from "@mui/material/ButtonBase";
import { useController, useFormContext } from "react-hook-form";
import type { Rules } from "../../Types/common";
import type { ChangeEventHandler } from "react";
import type { TextFieldProps } from "@mui/material";

export interface FormNumberInputProps extends Omit<TextFieldProps, "name"> {
  name: string;
  min?: number;
  max?: number;
  rules?: Rules;
}

const FormNumberInput = (props: FormNumberInputProps) => {
  const {
    name,
    placeholder,
    disabled,
    required,
    defaultValue,
    rules,
    min,
    max,
    sx,
    ...rest
  } = props;

  const { control } = useFormContext();

  const {
    field: { value, ref, onBlur, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    if (value.match(/[^0-9]/)) {
      return event.preventDefault();
    }
    onChange(value);
  };

  const handleReduce = () => {
    if (min) {
      min < value && onChange(Number(value) - 1);
    } else {
      onChange(Number(value) - 1);
    }
  };

  const handleAdd = () => {
    if (max) {
      max > value && onChange(Number(value) + 1);
    } else {
      onChange(Number(value) + 1);
    }
  };

  return (
    <TextField
      id={name}
      required={required}
      error={Boolean(error)}
      helperText={error?.message}
      placeholder={disabled ? void 0 : placeholder}
      disabled={disabled}
      onChange={handleChange}
      onBlur={onBlur}
      value={value}
      name={name}
      inputRef={ref}
      size="small"
      InputProps={{
        startAdornment: (
          <ButtonBase onClick={handleReduce}>
            <RemoveIcon />
          </ButtonBase>
        ),
        endAdornment: (
          <ButtonBase onClick={handleAdd}>
            <AddIcon />
          </ButtonBase>
        ),
      }}
      sx={{ ...sx, "& .MuiInputBase-input": { textAlign: "center" } }}
      {...rest}
    />
  );
};

export default FormNumberInput;
