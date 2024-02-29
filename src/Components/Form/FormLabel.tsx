import type { FormLabelProps } from "@mui/material/FormLabel";
import { type FC, Fragment } from "react";
import Typography from "@mui/material/Typography";
import FormLabelMUI from "@mui/material/FormLabel";

interface Props extends FormLabelProps {
  title: string;
  name: string;
}

const FormLabel: FC<Props> = (props) => {
  const { title, name, children, ...rest } = props;

  return (
    <Fragment>
      <FormLabelMUI htmlFor={name} {...rest}>
        <Typography
          variant="body2"
          sx={{ display: "inline-block" }}
          gutterBottom
        >
          {title}
        </Typography>
      </FormLabelMUI>
      {children}
    </Fragment>
  );
};

export default FormLabel;
