import React from "react";
import { Form, Input, Checkbox, Header } from "semantic-ui-react";
import FieldError from "../FieldError";
import { FormattedMessage } from "react-intl";
import SubcatListInput from "./SubcatListInput";
import SubprodListIntput from "./SubprodListIntput";
import { FieldArray } from "formik";
import SubprodForm from "./SubprodForm";

const FormField = Form.Field;

const ChoiceForm = ({ choice, errors, handleChange, index, setFieldValue }) => {
  console.log("choice subprods", choice.subprods);
  return (
    <div size="tiny" style={{ padding: 10 }}>
      <Header content={`option ${index + 1}`} />
      <FormField>
        <label>
          <FormattedMessage id="name" />
        </label>
        <Input
          size="mini"
          icon="setting"
          value={choice.name}
          name={`choices.${index}.name`}
          fluid
          onChange={handleChange}
        />
        {errors && errors[index] && errors[index].name && (
          <FieldError message={errors[index].name} />
        )}
      </FormField>
      <FormField>
        <label>
          <FormattedMessage id="subcat_name" />
        </label>
        <SubcatListInput
          value={choice.subcat_id}
          inputName={`choices.${index}.subcat_id`}
          setFieldValue={setFieldValue}
          error={
            errors && errors[index] && errors[index].subcat_id ? true : false
          }
        />
        {errors && errors[index] && errors[index].subcat_id && (
          <FieldError message={errors[index].subcat_id} />
        )}
      </FormField>
      {choice.subcat_id && (
        <FormField>
          <label>
            <FormattedMessage id="subprods" />
          </label>
          <SubprodListIntput
            inputName={`choices.${index}.subprods`}
            subcat_id={choice.subcat_id}
            setFieldValue={setFieldValue}
            values={
              choice.subprods && choice.subprods.length > 0
                ? choice.subprods
                : []
            }
          />
        </FormField>
      )}
      {choice.subcat_id && (
        <FieldArray
          name={`choices.${index}.subprods`}
          render={arrayHelpers => (
            <div style={{ textAlign: "center" }}>
              <span>
                <FormattedMessage id="selected_subprods" />
              </span>
              {choice.subprods && choice.subprods.length > 0 ? (
                choice.subprods.map((prod, i) => {
                  return (
                    <SubprodForm
                      inputName={`choices.${index}.subprods[${i}].free_choice`}
                      subprod={prod}
                      setFieldValue={setFieldValue}
                      index={i}
                      key={i}
                      arrayHelpers={arrayHelpers}
                    />
                  );
                })
              ) : (
                <div>
                  <FieldError
                    message={<FormattedMessage id="subprod_required" />}
                  />
                </div>
              )}
            </div>
          )}
        />
      )}

      <FormField>
        <Checkbox
          name={`choices.${index}.choice_mandatory`}
          id={`choices.${index}.choice_mandatory`}
          toggle
          onChange={handleChange}
          checked={choice.choice_mandatory}
          label={
            <label>
              <FormattedMessage id="choice_mandatory" />
            </label>
          }
        />
      </FormField>
      <FormField>
        <Checkbox
          name={`choices.${index}.choice_multiple`}
          id={`choices.${index}.choice_multiple`}
          toggle
          onChange={handleChange}
          checked={choice.choice_multiple}
          label={
            <label>
              <FormattedMessage id="choice_multiple" />
            </label>
          }
        />
      </FormField>
    </div>
  );
};

export default ChoiceForm;
