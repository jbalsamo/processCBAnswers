/**
 *
 * file: Helper functions
 * author: Joseph Balsamo <https://github.com/jbalsamo>
 * description: A collection of helper functions I use in my projects.
 * last updated: 2024-05-09
 */

// Import libraries
import { createWriteStream } from "fs";

/**
 * Retrieves the unique values of a specified attribute from a JSON array.
 *
 * @param {Array} json_array - The JSON array from which to extract attribute values.
 * @param {string} attribute - The attribute name whose values are to be extracted.
 * @return {Array} An array containing the unique values of the specified attribute.
 */
export const getAttributeValues = async (json_array, attribute) => {
  const attributeSet = new Set();

  // Extracting attribute values and adding them to the set
  json_array.forEach((item) => {
    if (item[attribute]) {
      attributeSet.add(item[attribute]);
    }
  });

  const attributeArray = [...attributeSet];

  return attributeArray;
};

/**
 * Filters an array of JSON objects based on a specified attribute and filter value.
 *
 * @param {Array} json_array - The array of JSON objects to filter.
 * @param {string} attribute - The attribute name to filter on.
 * @param {any} filterValue - The value to filter the attribute on.
 * @return {Array} An array of JSON objects that match the filter criteria.
 */
export const getFilteredArray = (json_array, attribute, filterValue) =>
  json_array.filter((item) => item[attribute] === filterValue);

/**
 * Creates a write stream for the specified file with the given mode.
 *
 * @param {string} filename - The name of the file to write to.
 * @param {string} mode - The mode to open the file in.
 * @return {WriteStream} The write stream for the file.
 */
export const getStreamWriter = (filename, flag, mode) => {
  return createWriteStream(filename, {
    encoding: "utf8",
    flag: flag,
    mode: mode
  });
};

/**
 * Chooses the first non-blank attribute from a JSON objects list of
 * attributes.
 *
 * @param {Object} obj - The JSON object to search.
 * @return {string} The value of the first non-blank attribute found.
 */
export const selectedAnswer = (obj) => {
  const attributes = [
    "views_conditional_field",
    "views_conditional_field_1",
    "views_conditional_field_2",
    "views_conditional_field_3"
  ];

  for (let attribute of attributes) {
    if (obj[attribute] && obj[attribute].trim() !== "") {
      return obj[attribute];
    }
  }

  return "";
};
