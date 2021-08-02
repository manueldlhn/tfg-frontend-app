import React from 'react';
import { useFormikContext } from 'formik';

import TextInput from '../TextInput';
import Text from '../Text';
import ErrorMessage from './ErrorMessage';


function AppFormField({name, width, editable, title=false, ...otherProps}) {
    const { setFieldTouched, setFieldValue, errors, touched, values} = useFormikContext();

  return (
    <>
      {title && <Text style={{fontWeight: "bold"}}>{title}</Text>}
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        editable={editable}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  )
};

export default AppFormField;