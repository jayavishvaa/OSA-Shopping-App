import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ title, style }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} style={style} onPress={handleSubmit} />;
}

export default SubmitButton;
