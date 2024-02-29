import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Step1 from "./Components/Step1";
import Step2 from "./Components/Step2";
import Step3 from "./Components/Step3";
import Review from "./Components/Review";
import TabsPreOrderFood from "./Components/TabsPreOrderFood";
import useMultipleStepForm from "../hooks/useMultipleStepForm";

interface Dishes {
  dish: string;
  noServings: number;
}

export interface FormValues {
  meal: string;
  numberPeople: string;
  restaurant: string;
  dishes: Dishes[];
}

const DEFAULT_VALUE = {
  meal: "",
  numberPeople: "",
  restaurant: "",
  dishes: [{ dish: "", noServings: 1 }],
};

const tabs = [
  { label: "Step 1", content: <Step1 /> },
  { label: "Step 2", content: <Step2 /> },
  { label: "Step 3", content: <Step3 /> },
  { label: "Review", content: <Review /> },
];

const PreOrderFood = () => {
  const [openWarning, setOpenWarning] = useState<boolean>(false);
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: DEFAULT_VALUE,
  });

  const contents = tabs.map((tab) => tab.content);
  const { curentStepIndex, next, previous, step, isFirstStep, isLastStep } =
    useMultipleStepForm(contents);

  const onSubmit = (data: FormValues) => console.log(data);

  const handleNext = async () => {
    const isFormValid = await methods.trigger();
    let isEnough = true;
    if (curentStepIndex === 2 && isFormValid) {
      const [dishes, numberPeople] = methods.getValues([
        "dishes",
        "numberPeople",
      ]);
      const totalDishes = dishes.reduce(
        (acc, dish) => acc + Number(dish.noServings),
        0
      );
      isEnough = totalDishes >= Number(numberPeople);
      setOpenWarning(!isEnough);
    }
    if (isFormValid && isEnough) {
      next();
    }
  };

  return (
    <Box component={Paper} sx={{ maxWidth: 500, mx: "auto", width: 1 }}>
      <FormProvider {...methods}>
        <TabsPreOrderFood curentStepIndex={curentStepIndex} tabs={tabs} />
        <Divider />
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box p={1}>
            <Box sx={{ height: 350, overflowY: "auto" }}>{step}</Box>
            <Stack
              direction="row"
              justifyContent={isFirstStep ? "end" : "space-between"}
              pt={2}
            >
              {!isFirstStep && (
                <Button variant="contained" onClick={previous}>
                  previous
                </Button>
              )}
              {!isLastStep ? (
                <Button variant="contained" key="NextForm" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button variant="contained" key="SubmitForm" type="submit">
                  Submit
                </Button>
              )}
            </Stack>
          </Box>
        </form>
      </FormProvider>
      <Snackbar
        open={openWarning}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setOpenWarning(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenWarning(false);
          }}
          severity="warning"
          variant="standard"
        >
          The total number of dishes should be greater or equal to the number of
          people selected
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PreOrderFood;
