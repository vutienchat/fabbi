import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";

const FormItem = (props: BoxProps) => {
  const { children, ...rest } = props;
  return (
    <Box sx={{ "& + &": { mt: 1.5 } }} {...rest}>
      {children}
    </Box>
  );
};

export default FormItem;
