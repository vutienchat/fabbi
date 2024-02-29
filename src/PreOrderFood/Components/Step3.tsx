import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import { useFieldArray, useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";

import FormLabel from "../../Components/Form/FormLabel";
import FormSelect from "../../Components/Form/FormSelect";
import FormNumberInput from "../../Components/Form/FormNumberInput";
import type { FormValues } from "../";

const Step3 = () => {
  const { control, watch } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dishes",
  });

  const dishes = watch("dishes");

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Grid container spacing={2}>
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <Grid item xs={5}>
              <FormLabel title="Please Select a dish" name="dish" />
              <FormSelect
                renderValue={(dish) => dish.label}
                rules={{ required: "required" }}
                name={`dishes.${index}.dish`}
                getOptionDisabled={({ label }) =>
                  dishes.some(({ dish }) => dish === label)
                }
                options={[
                  { id: 1, label: "Dish A" },
                  { id: 2, label: "Dish B" },
                  { id: 3, label: "Dish C" },
                ]}
              />
            </Grid>
            <Grid item xs={5}>
              <FormLabel
                title="Please enter no. of servings"
                name="noServings"
              />
              <FormNumberInput
                name={`dishes.${index}.noServings`}
                fullWidth
                rules={{
                  required: "required",
                  min: { value: 1, message: "Minimum 1 people" },
                }}
                min={1}
              />
            </Grid>
            {index !== 0 && (
              <Grid item xs={1} sx={{ alignSelf: "center" }}>
                <IconButton
                  size="small"
                  sx={{ mt: 3 }}
                  onClick={() => remove(index)}
                  color="error"
                >
                  <RemoveIcon />
                </IconButton>
              </Grid>
            )}
          </Fragment>
        ))}
      </Grid>
      {fields.length <= 10 && (
        <Box>
          <IconButton
            size="small"
            sx={{ mt: 1 }}
            onClick={() => append({ dish: "", noServings: 1 })}
          >
            <AddIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Step3;
