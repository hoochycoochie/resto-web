import { FormattedMessage } from "react-intl";
import React from "react";
import * as Yup from "yup";
const FILE_SIZE = 1600 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const createProductSchema = Yup.object().shape({
  file: Yup.mixed()
    .test("fileFormat", <FormattedMessage id="not_supported" />, value => {
      if (value) {
        return value && SUPPORTED_FORMATS.includes(value.type);
      }
      return true;
    })
    .test("fileSize", <FormattedMessage id="file_too_large" />, value => {
      if (value) {
        return value && value.size <= FILE_SIZE;
      }
      return true;
    }),

  name: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(50, <FormattedMessage id="max_50_characters" />)

    .required(<FormattedMessage id="required" />),
  description: Yup.string()
    .trim()
    .min(2, <FormattedMessage id="min_2_characters" />)
    .required(<FormattedMessage id="required" />),
  has_choice_size: Yup.boolean()
    .typeError(<FormattedMessage id="required" />)
    .required(<FormattedMessage id="required" />),
  sizes: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .trim()
          .typeError(<FormattedMessage id="required" />)
          .min(2, <FormattedMessage id="min_2_characters" />)
          .max(50, <FormattedMessage id="max_50_characters" />), // these constraints take precedence
        price: Yup.number()
          .typeError(<FormattedMessage id="required" />)
          .required(<FormattedMessage id="required" />)
          .positive(<FormattedMessage id="invalid_number" />)
      })
    )
    .when("has_choice_size", (has_choice_size, schema) => {
      return has_choice_size
        ? schema.required(<FormattedMessage id="required" />)
        : schema.nullable();
    })
    .nullable()
});

export default createProductSchema;
