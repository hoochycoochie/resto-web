import React from "react";
import { Form, Input, Checkbox, Header, Icon } from "semantic-ui-react";
import FieldError from "../FieldError";
import { FormattedMessage } from "react-intl";
import SubcatListInput from "./SubcatListInput";
import SubprodListIntput from "./SubprodListIntput";
import { FieldArray } from "formik";
import SubprodForm from "./SubprodForm";
import { colors } from "../../utils/constants";

const FormField = Form.Field;

const ChoiceForm = ({
  choice,
  errors,
  handleChange,
  index,
  setFieldValue,
  setFieldError,
  arrayHelpers
}) => {
  const choice_number_range = choice.subprods.length
    ? Array.from(choice.subprods, (_, index) => ({
        key: index,
        value: index + 1,
        text: index + 1
      }))
    : [];

  let current_choice_number =
    choice.choice_number && choice_number_range.length > 0
      ? choice_number_range.find(
          c => c.value.toString() === choice.choice_number.toString()
        )
      : null;
  const readOnlyChoiceNumber = choice.choice_multiple ? false : true;

  return (
    <div size="tiny" style={{ padding: 10 }}>
      <Header content={`option ${index + 1}`} />
      <div style={{ float: "right" }}>
        <Icon
          style={{ fontSize: 20, color: colors.RED, marginTop: 10 }}
          name="delete"
          onClick={async () => await arrayHelpers.remove(index)}
        />
      </div>
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

      {choice.subprods.length && (
        <FormField required>
          <label>
            <FormattedMessage id="choice_number_max" />
          </label>

          <Form.Select
            readOnly={readOnlyChoiceNumber}
            name={`choices.${index}.choice_number`}
            id={`choices.${index}.choice_number`}
            simple
            selection
            openOnFocus={false}
            selectOnBlur={false}
            options={choice_number_range}
            onChange={async (_, { name, value }) => {
              if (!choice.choice_multiple && parseInt(value) > 1) {
                await setFieldError(
                  `choices.${index}.choice_number`,
                  <FormattedMessage id="choice_multipe_error" />
                );
              } else {
                await setFieldValue(
                  `choices.${index}.choice_number`,
                  parseInt(value)
                );
              }
            }}
            value={
              current_choice_number && current_choice_number.value
                ? current_choice_number.value
                : null
            }
          />
          {errors && errors[index] && errors[index].choice_number && (
            <FieldError message={errors[index].choice_number} />
          )}
        </FormField>
      )}
    </div>
  );
};

export default ChoiceForm;
