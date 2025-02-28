/**
 * @file basic.js
 * @description Basic usage examples for the tokenizer library
 */

const Tokenizer = require("../src/tokenizer");
const path = require("path");

// Create a basic tokenizer
const basicTokenizer = new Tokenizer();

// Example text
const text =
  "Natural language processing (NLP) is a subfield of linguistics, computer science, and artificial intelligence concerned with the interactions between computers and human language.";

console.log("\n========== BASIC USAGE EXAMPLES ==========\n");

// Basic tokenization
console.log("Basic tokenization:");
console.log(basicTokenizer.tokenize(text));

// Create a tokenizer with stopwords removal
const stopwordTokenizer = new Tokenizer({ removeStopwords: true });
console.log("\nTokenization with stopwords removal:");
console.log(stopwordTokenizer.tokenize(text));

// Create a tokenizer with stemming
const stemmingTokenizer = new Tokenizer({ stemming: true });
console.log("\nTokenization with stemming:");
console.log(stemmingTokenizer.tokenize(text));

// Create a tokenizer with all options
const advancedTokenizer = new Tokenizer({
  lowercase: true,
  removeStopwords: true,
  stemming: true,
  customStopwords: ["nlp", "subfield"],
});
console.log("\nAdvanced tokenization:");
console.log(advancedTokenizer.tokenize(text));

// N-gram tokenization
console.log("\nBigram tokenization:");
console.log(basicTokenizer.ngramTokenize(text, 2));

// Get token frequency
console.log("\nToken frequency:");
console.log(basicTokenizer.getTokenFrequency(text));

console.log("\n========== THAI LANGUAGE EXAMPLES ==========\n");

// Example Thai text
const thaiText = "ภาษาไทยเป็นภาษาที่มีความซับซ้อน";

// Regular tokenization with Thai text
console.log("Basic Thai tokenization:");
console.log(basicTokenizer.tokenize(thaiText));

// Dictionary-based Thai tokenization
const thaiTokenizer = new Tokenizer({ language: "th" });

// Create a simple Thai dictionary
const thaiDictionaryPath = path.join(
  __dirname,
  "../data/dictionaries/thai-dict.txt",
);
try {
  const fs = require("fs");
  if (!fs.existsSync(path.dirname(thaiDictionaryPath))) {
    fs.mkdirSync(path.dirname(thaiDictionaryPath), { recursive: true });
  }

  const thaiWords = ["ภาษา", "ไทย", "เป็น", "ที่", "มี", "ความ", "ซับซ้อน"];
  fs.writeFileSync(thaiDictionaryPath, thaiWords.join("\n"), "utf8");
} catch (err) {
  console.error("Error creating Thai dictionary:", err);
}

// Load the Thai dictionary
thaiTokenizer.loadThaiDictionarySync(thaiDictionaryPath);

// Tokenize Thai with dictionary
console.log("\nThai tokenization with dictionary:");
console.log(thaiTokenizer.tokenize(thaiText));

console.log("\n========== END OF EXAMPLES ==========\n");
