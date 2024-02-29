import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { type SelectProps } from "@mui/material/Select";
import { useController, useFormContext } from "react-hook-form";
import type { Rules } from "../../Types/common";
import type { FieldValues } from "react-hook-form";

interface FormSelectProps<O>
  extends Omit<SelectProps, "name" | "value" | "variant" | "renderValue"> {
  name: string;
  options: O[];
  renderValue?: (option: O) => string;
  getOptionDisabled?: (option: O) => boolean;
  rules?: Rules;
}

const FormSelect = <O extends FieldValues>(props: FormSelectProps<O>) => {
  const {
    name,
    options,
    renderValue = (option) => option.value,
    getOptionDisabled,
    rules,
  } = props;
  const { control } = useFormContext();

  const {
    field: { value, onChange, ...others },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <>
      <FormControl fullWidth error={Boolean(error)}>
        <Select
          labelId={name}
          id={name}
          value={value}
          onChange={onChange}
          {...others}
          size="small"
        >
          {options.map((option) => (
            <MenuItem
              value={renderValue(option)}
              key={option.id}
              disabled={
                renderValue(option) === value
                  ? false
                  : getOptionDisabled?.(option)
              }
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error?.message && (
          <FormHelperText variant="outlined">{error.message}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default FormSelect;
