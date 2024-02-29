import FormLabel from "../../Components/Form/FormLabel";
import FormSelect from "../../Components/Form/FormSelect";

const Step2 = () => {
  return (
    <>
      <FormLabel title="Please Select a restaurant" name="restaurant" />
      <FormSelect
        name="restaurant"
        rules={{ required: "required" }}
        renderValue={(restaurant) => restaurant.label}
        options={[
          { id: 1, label: "Restaurant A" },
          { id: 2, label: "Restaurant B" },
          { id: 3, label: "Restaurant C" },
        ]}
      />
    </>
  );
};

export default Step2;
