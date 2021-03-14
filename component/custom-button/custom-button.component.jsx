import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    width: "200px",
    marginTop: "10px",
    marginBottom: "10px",
  },
});
const CustomButton = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Button className={classes.root} {...props}>
      {" "}
      {children}
    </Button>
  );
};

export default CustomButton;
