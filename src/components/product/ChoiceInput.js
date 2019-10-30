import React from "react";
import { FieldArray } from "formik";
import { Button } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import FieldError from "../FieldError";
import { colors } from "../../utils/constants";
import ChoiceForm from "./ChoiceForm";

function ChoiceInput({ values, handleChange, errors, touched, setFieldValue }) {
  return (
    <FieldArray
      name="choices"
      render={arrayHelpers => {
        return (
          <div>
            <div>
              <Button
                floated="left"
                icon="plus"
                style={{
                  backgroundColor: colors.PINK,
                  color: colors.VIOLET,
                  marginBottom: 50
                }}
                disabled={errors && errors.length ? true : false}
                onClick={async () => {
                  await arrayHelpers.unshift({
                    name: "",
                    subcat_id: "",
                    choice_mandatory: false,
                    choice_multiple: false,
                    subprods: []
                  });
                }}
                content={<FormattedMessage id="add_options" />}
              />
            </div>
            <br />
            <br />

            {values && values.length > 0 ? (
              values.map((choice, index) => (
                <div
                  key={index}
                  style={{
                    marginTop: 30,
                    borderRadius: 20,
                    borderWidth: 5,
                    borderColor: colors.VIOLET,
                    backgroundColor: colors.LIGHT_GRAY
                  }}
                >
                  <ChoiceForm
                    key={index}
                    choice={choice}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                    index={index}
                    setFieldValue={setFieldValue}
                  />
                </div>
              ))
            ) : (
              <div>
                <FieldError
                  message={<FormattedMessage id="options_required" />}
                />
              </div>
            )}
          </div>
        );
      }}
    />
  );
}

export default ChoiceInput;
