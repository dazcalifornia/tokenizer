/**
 * @file thai.js
 * @description Thai language specific tokenization methods
 */

const fs = require("fs");

/**
 * Dictionary-based Thai word segmentation
 * @param {string} text - Thai text to tokenize
 * @param {Set} dictionary - Set of Thai words
 * @returns {string[]} Array of Thai tokens
 */
function dictionaryTokenize(text, dictionary) {
  if (!text) return [];
  if (!dictionary || !dictionary.size) {
    return simpleTokenize(text);
  }

  const tokens = [];
  let remaining = text;

  while (remaining.length > 0) {
    // Try to find the longest matching word from the current position
    let found = false;
    let longestWord = "";

    // Check for matches in the dictionary (longest first)
    for (const word of dictionary) {
      if (remaining.startsWith(word) && word.length > longestWord.length) {
        longestWord = word;
        found = true;
      }
    }

    // If found a match in the dictionary
    if (found) {
      tokens.push(longestWord);
      remaining = remaining.slice(longestWord.length);
    } else {
      // No match found, consume one character
      tokens.push(remaining[0]);
      remaining = remaining.slice(1);
    }

    // Skip whitespace
    while (remaining.length > 0 && remaining[0] === " ") {
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

/**
 * Simple character-based Thai tokenization
 * @param {string} text - Thai text to tokenize
 * @returns {string[]} Array of Thai tokens
 */
function simpleTokenize(text) {
  const tokens = [];
  let currentToken = "";

  // Thai Unicode range: \u0E00-\u0E7F
  const thaiPattern = /[\u0E00-\u0E7F]/;
  const thaiVowelPattern = /[\u0E30-\u0E3A\u0E40-\u0E45]/;
  const thaiToneMarkPattern = /[\u0E47-\u0E4E]/;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    // If we find a space, punctuation, or non-Thai character, it's a boundary
    if (char === " " || !thaiPattern.test(char)) {
      if (currentToken) {
        tokens.push(currentToken);
        currentToken = "";
      }

      // Add non-Thai tokens too (if not whitespace)
      if (char.trim()) {
        tokens.push(char);
      }
      continue;
    }

    // Add character to current token
    currentToken += char;

    // Use some basic rules to guess word boundaries
    // This is a simplified approach and won't be as accurate as dictionary-based methods
    const nextChar = i < text.length - 1 ? text[i + 1] : "";

    // If current character is not a vowel or tone mark, and next character is a vowel,
    // it might be the start of a new syllable/word
    if (
      !thaiVowelPattern.test(char) &&
      !thaiToneMarkPattern.test(char) &&
      thaiVowelPattern.test(nextChar)
    ) {
      tokens.push(currentToken);
      currentToken = "";
    }
  }

  // Add any remaining token
  if (currentToken) {
    tokens.push(currentToken);
  }

  return tokens;
}

/**
 * Load a Thai dictionary from a file
 * @param {string} filePath - Path to dictionary file
 * @param {function} callback - Callback function
 */
function loadDictionary(filePath, callback) {
  try {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error loading Thai dictionary:", err);
        if (callback) callback(err);
        return;
      }

      // Initialize dictionary as a Set for faster lookups
      const dictionary = new Set();

      // Process each line as a dictionary entry
      const words = data.split(/\r?\n/);
      words.forEach((word) => {
        if (word.trim()) {
          dictionary.add(word.trim());
        }
      });

      console.log(`Loaded ${dictionary.size} Thai words into dictionary`);
      if (callback) callback(null, dictionary);
    });
  } catch (error) {
    console.error("Error loading Thai dictionary:", error);
    if (callback) callback(error);
  }
}

/**
 * Load a Thai dictionary synchronously
 * @param {string} filePath - Path to dictionary file
 * @returns {Set} Set of Thai words
 */
function loadDictionarySync(filePath) {
  const data = fs.readFileSync(filePath, "utf8");

  // Initialize dictionary as a Set for faster lookups
  const dictionary = new Set();

  // Process each line as a dictionary entry
  const words = data.split(/\r?\n/);
  words.forEach((word) => {
    if (word.trim()) {
      dictionary.add(word.trim());
    }
  });

  console.log(`Loaded ${dictionary.size} Thai words into dictionary`);
  return dictionary;
}

module.exports = {
  dictionaryTokenize,
  simpleTokenize,
  loadDictionary,
  loadDictionarySync,
};
