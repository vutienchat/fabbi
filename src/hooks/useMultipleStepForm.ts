import { useCallback, useState } from "react";
import type { ReactElement } from "react";

const useMultipleStepForm = (steps: ReactElement[]) => {
  const [curentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const next = useCallback(() => {
    setCurrentStepIndex((index) => {
      if (index === steps.length - 1) return index;
      return index + 1;
    });
  }, []);

  const previous = useCallback(() => {
    setCurrentStepIndex((index) => {
      if (index === 0) return index;
      return index - 1;
    });
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentStepIndex(index);
  }, []);

  return {
    next,
    previous,
    goTo,
    curentStepIndex,
    step: steps[curentStepIndex],
    isFirstStep: curentStepIndex === 0,
    isLastStep: curentStepIndex === steps.length - 1,
  };
};
export default useMultipleStepForm;
