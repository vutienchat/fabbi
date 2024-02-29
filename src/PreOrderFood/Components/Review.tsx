import { Box, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC, PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import type { FormValues } from "../";

const Review = () => {
  const { getValues } = useFormContext<FormValues>();
  const { dishes, meal, numberPeople, restaurant } = getValues();

  return (
    <>
      <Item label="Meal" value={meal} />
      <Item label="No. of people" value={numberPeople} />
      <Item label="Restaurant" value={restaurant} />
      <Item label="Dishes">
        <Box
          sx={(theme) => ({
            border: `2px solid ${theme.palette.divider}`,
            p: 2,
          })}
        >
          {dishes.map(({ dish, noServings }, i) => (
            <Typography key={i}>
              {dish} - {noServings}
            </Typography>
          ))}
        </Box>
      </Item>
    </>
  );
};

export default Review;

interface ItemProps {
  label: string;
  value?: string;
}

const Item: FC<PropsWithChildren<ItemProps>> = ({ label, value, children }) => {
  return (
    <Stack direction="row" pb={2}>
      <Typography
        sx={{ width: 150, fontWeight: 600 }}
        variant="body2"
        gutterBottom
      >
        {label}
      </Typography>
      {value ? <Typography variant="body2">{value}</Typography> : children}
    </Stack>
  );
};
