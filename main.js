#! /usr/bin/env node
import { program } from "commander";
import { config } from "dotenv";
import { setTimeout } from "timers/promises";
import {
  submitQuestionDocuments,
  submitQuestionGeneralGPT
} from "./libraries/azureHelpers.js";
import {
  getQuestions,
  loginDrupal,
  logoutDrupal,
  post2Drupal
} from "./libraries/drupalHelpers.js";

// Load environment variables
config({ path: "/etc/gptbot/.env" });

// Constants
const drupalUrl = process.env.DRUPAL_BASE_URL;
const azBaseUrl = process.env.AZ_BASE_URL;
const azApiKey = process.env.AZ_API_KEY;
const azSearchUrl = process.env.AZ_SEARCH_URL;
const azSearchKey = process.env.AZ_SEARCH_KEY;
const azIndexName = process.env.AZ_INDEX_NAME;
const azPMIndexName = process.env.AZ_PM_INDEX_NAME;
const uname = process.env.DRUPAL_USERNAME;
const pword = process.env.DRUPAL_PASSWORD;

// * Globals
let Cookie, csrf_token, logout_token;

/**
 *
 * Main Program
 *
 */
