import FormItem from "../../Components/Form/FormItem";
import FormLabel from "../../Components/Form/FormLabel";
import FormSelect from "../../Components/Form/FormSelect";
import FormNumberInput from "../../Components/Form/FormNumberInput";

const Step1 = () => {
  return (
    <>
      <FormItem>
        <FormLabel title="Please Select a meal" name="meal" />
        <FormSelect
          name="meal"
          rules={{ required: "required" }}
          renderValue={(meal) => meal.label}
          options={[
            { id: 1, label: "Breakfast" },
            { id: 2, label: "Lunch" },
            { id: 3, label: "Dinner" },
          ]}
        />
      </FormItem>
      <FormItem>
        <FormLabel title="Please enter number of people" name="numberPeople" />
        <FormNumberInput
          name="numberPeople"
          fullWidth
          rules={{
            required: "required",
            max: { value: 10, message: "Maximum 10 people" },
            min: { value: 1, message: "Minimum 1 people" },
          }}
          min={1}
          max={10}
        />
      </FormItem>
    </>
  );
};

export default Step1;
