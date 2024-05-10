#! /usr/bin/env node
// Import dependencies
import { program } from "commander";
import { config } from "dotenv";
import {
  getApprovedAnswers,
  getQuestions,
  loginDrupal,
  logoutDrupal
} from "./libraries/drupalHelpers.js";
import {
  getAttributeValues,
  getFilteredArray,
  getStreamWriter,
  selectedAnswer
} from "./libraries/helpers.js";

// Load environment variables
config({ path: "/etc/gptbot/.env" });

// Constants
const drupalUrl = process.env.DRUPAL_BASE_URL;
const uname = process.env.DRUPAL_USERNAME;
const pword = process.env.DRUPAL_PASSWORD;

// * Globals
let Cookie, csrf_token, logout_token;

// * Functions

/**
 * Retrieves vetted answers after logging in and logging out of Drupal.
 *
 * @return {Array} The vetted answers fetched from Drupal.
 */
const getVettedAnswers = async () => {
  const { Cookie, csrf_token, logout_token } = await loginDrupal(
    drupalUrl,
    uname,
    pword
  );

  console.log("Logged in.");
  const answers = await getApprovedAnswers(drupalUrl, csrf_token);

  await logoutDrupal(drupalUrl, logout_token);

  return answers;
};

/**
 *
 * Main Program
 *
 */

program
  .command("dump-answers")
  .description("Process the questions.")
  .action(async () => {
    console.log("Dumping answers.");

    const answers = await getVettedAnswers();
    // console.log(answers);

    let categories = await getAttributeValues(answers, "field_category");

    categories.forEach((category) => {
      let filteredAnswers = getFilteredArray(
        answers,
        "field_category",
        category
      );

      let filename = `./data/${category}.txt`;
      let fileStream = getStreamWriter(filename, "w", "0666");

      filteredAnswers.forEach((answer) => {
        let selected = selectedAnswer(answer);
        fileStream.write("---" + "\n");
        fileStream.write("nid: " + answer.nid + "\n");
        fileStream.write("category: " + answer.field_category + "\n");
        fileStream.write("question: " + answer.field_enter_question + "\n");
        fileStream.write("answer: " + selected + "\n\n");
      });
      fileStream.end();
    });
  });

program.parse(process.argv);

/**
 *
 * End of Program
 *
 */
