const React = require('react');
const { useField, useFormikContext, Form } = require('formik');
 
const XwingTextInput = (props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  const somethingWrong = meta.touched && meta.error;
  return (
    <>
      <input placeholder={props.name} {...field} {...props} style={{ ...props.style, animation: somethingWrong ? "shake 300ms" : props.style?.animation}}/>
      {somethingWrong ? (
        <div className="inputValidationMsg"><i className="fa-solid fa-triangle-exclamation" />{meta.error}</div>
      ) : null}
    </>
  );
};

const XwingFormSubmitButton = (({children,...props}) => {
  const formikContext = useFormikContext();
  
  return (<button type="submit" disabled={formikContext.isSubmitting} {...props}>{formikContext.isSubmitting ? 'Loading...' : children}</button>); 
});

const XwingForm = (({children,...props}) => {
  const formikContext = useFormikContext();
  return (
    <Form {...props}>
      <fieldset disabled={formikContext.isSubmitting} style={{borderStyle: 'none'}}>
        {children}
      </fieldset>
    </Form>); 
});

module.exports = { XwingTextInput, XwingFormSubmitButton, XwingForm };