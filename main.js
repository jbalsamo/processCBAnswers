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

// Load environment variables
config({ path: "/etc/gptbot/.env" });

// Constants
const drupalUrl = process.env.DRUPAL_BASE_URL;
const uname = process.env.DRUPAL_USERNAME;
const pword = process.env.DRUPAL_PASSWORD;

// * Globals
let Cookie, csrf_token, logout_token;

// * Functions

const getVettedAnswers = async () => {
  const { Cookie, csrf_token, logout_token } = await loginDrupal(
    drupalUrl,
    uname,
    pword
  );

  console.log("Logged in.");
  const answers = await getApprovedAnswers(drupalUrl, csrf_token);
  console.log("Got answers.");
  console.log(answers.length);

  await logoutDrupal(drupalUrl, logout_token);

  await console.log(answers);
};

/**
 *
 * Main Program
 *
 */

// program
//   .command("dump-answers")
//   .description("Process the questions.")
//   .action(getVettedAnswers);

getVettedAnswers();
/**
 *
 * End of Program
 *
 */
