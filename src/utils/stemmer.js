/**
 * @file stemmer.js
 * @description Simple Porter stemming algorithm implementation
 */

/**
 * Simple Porter stemming algorithm
 * @param {string} token - Token to stem
 * @returns {string} Stemmed token
 */
function stemToken(token) {
  if (!token || typeof token !== "string") {
    return "";
  }

  // This is a simplified version of the Porter stemming algorithm
  // For production use, consider using a more robust stemming library

  let word = token.toLowerCase();

  // Step 1a
  if (word.endsWith("sses")) {
    word = word.slice(0, -2);
  } else if (word.endsWith("ies")) {
    word = word.slice(0, -2);
  } else if (word.endsWith("ss")) {
    // Do nothing
  } else if (word.endsWith("s")) {
    word = word.slice(0, -1);
  }

  // Step 1b
  if (word.endsWith("eed")) {
    // Additional checks would be needed for a full implementation
    word = word.slice(0, -1);
  } else if (
    (word.endsWith("ed") && /[aeiou]/.test(word.slice(0, -2))) ||
    (word.endsWith("ing") && /[aeiou]/.test(word.slice(0, -3)))
  ) {
    word = word.endsWith("ed") ? word.slice(0, -2) : word.slice(0, -3);

    if (word.endsWith("at") || word.endsWith("bl") || word.endsWith("iz")) {
      word += "e";
    } else if (
      word.length > 2 &&
      word[word.length - 1] === word[word.length - 2] &&
      !["l", "s", "z"].includes(word[word.length - 1])
    ) {
      word = word.slice(0, -1);
    }
  }

  // Step 1c
  if (
    word.endsWith("y") &&
    word.length > 2 &&
    !/[aeiou]/.test(word[word.length - 2])
  ) {
    word = word.slice(0, -1) + "i";
  }

  // Several more steps would be needed for a full Porter stemmer

  return word;
}

module.exports = stemToken;
