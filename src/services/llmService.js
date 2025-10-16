/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from '@google/genai';
import {
  CREDIT_VALIDATOR_PROMPT,
  APPRAISAL_ANALYSIS_PROMPT,
  TITLE_VALIDATION_PROMPT
} from './prompts.js';

// Initialize AI client
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

/**
 * Base function to generate content using Gemini API
 * @param {string} prompt - The prompt text
 * @param {File} file - The file to analyze
 * @param {string} fileDataUrl - The base64 encoded file data
 * @returns {Promise<string>} - The generated content
 */
async function generateContent(prompt, file, fileDataUrl) {
  const filePart = {
    inlineData: {
      mimeType: file.type,
      data: fileDataUrl.split(',')[1],
    },
  };

  const textPart = { text: prompt };
  const contents = { parts: [filePart, textPart] };

  const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: contents,
  });

  return result.text;
}

/**
 * Validate a credit report
 * @param {File} file - The credit report file
 * @param {string} fileDataUrl - The base64 encoded file data
 * @returns {Promise<Object>} - The parsed credit data
 */
export async function validateCreditReport(file, fileDataUrl) {
  try {
    let responseText = await generateContent(CREDIT_VALIDATOR_PROMPT, file, fileDataUrl);
    responseText = responseText.trim();

    // Remove markdown code blocks if present
    if (responseText.startsWith('```json')) {
      responseText = responseText.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (responseText.startsWith('```')) {
      responseText = responseText.replace(/```\n?/, '').replace(/\n?```$/, '');
    }

    const parsedData = JSON.parse(responseText);
    return parsedData;
  } catch (error) {
    console.error('Error validating credit report:', error);
    throw new Error('Failed to validate credit report. Please ensure the file is a valid credit report and try again.');
  }
}

/**
 * Analyze an appraisal document
 * @param {File} file - The appraisal document file
 * @param {string} fileDataUrl - The base64 encoded file data
 * @returns {Promise<Object>} - The parsed appraisal data
 */
export async function analyzeAppraisal(file, fileDataUrl) {
  try {
    let responseText = await generateContent(APPRAISAL_ANALYSIS_PROMPT, file, fileDataUrl);
    responseText = responseText.trim();

    // Remove markdown code blocks if present
    if (responseText.startsWith('```json')) {
      responseText = responseText.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (responseText.startsWith('```')) {
      responseText = responseText.replace(/```\n?/, '').replace(/\n?```$/, '');
    }

    const parsedData = JSON.parse(responseText);
    return parsedData;
  } catch (error) {
    console.error('Error analyzing appraisal:', error);
    throw new Error('Failed to analyze appraisal document. Please ensure the file is a valid appraisal and try again.');
  }
}

/**
 * Validate a title document
 * @param {File} file - The title document file
 * @param {string} fileDataUrl - The base64 encoded file data
 * @returns {Promise<string>} - The validation text
 */
export async function validateTitle(file, fileDataUrl) {
  try {
    const validationText = await generateContent(TITLE_VALIDATION_PROMPT, file, fileDataUrl);
    return validationText;
  } catch (error) {
    console.error('Error validating title:', error);
    throw new Error('Sorry, an error occurred while validating the title document.');
  }
}
