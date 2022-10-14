import * as Mui from "@mui/material";
import { TextFieldProps } from "@mui/material";

export const TextField = (props: TextFieldProps) => {
  return (
    <Mui.TextField
      {...props}
      fullWidth
      sx={{
        background: "#E8EDF1",
        borderRadius: "10px",
        border: "none",
        outline: "none",
        "& fieldset": { border: "none", fontSize: "13px" },
        "& input": { fontSize: "13px" }
      }}
      InputLabelProps={{
        style: {
          color: "#738383",
          fontSize: "13px",
          fontWeight: "bold"
        }
      }}
    />
  );
};
