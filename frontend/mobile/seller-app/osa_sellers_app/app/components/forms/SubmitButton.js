import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ title, style, ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  return <Button
    title={title}
    style={style}
    onPress={handleSubmit}
    {...otherProps}
  />;
}

export default SubmitButton;
