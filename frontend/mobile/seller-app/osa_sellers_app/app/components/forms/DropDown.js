import React from "react";
import { useFormikContext } from "formik";
import DropDownPicker from 'react-native-dropdown-picker';

import ErrorMessage from "./ErrorMessage";

function AppDropDown({
  items,
  name,
  placeholder,
  ...otherProps
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
    <DropDownPicker
        items={items}
        onChangeItem={item => setFieldValue(name, item)}
        placeholder={placeholder}
        name={name}
        {...otherProps}
    />
    <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppDropDown;