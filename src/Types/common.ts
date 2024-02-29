import type { FieldValues, RegisterOptions } from "react-hook-form";

export type Rules =
  | Omit<
      RegisterOptions<FieldValues, string>,
      "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
    >
  | undefined;
