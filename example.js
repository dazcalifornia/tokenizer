/**
 * @file example.js
 * @description Example usage of the Tokenizer library
 */

const Tokenizer = require("./tokenizer");

// Example text
const text =
  "Natural language processing (NLP) is a subfield of linguistics, computer science, and artificial intelligence concerned with the interactions between computers and human language.";

// Create a basic tokenizer
const basicTokenizer = new Tokenizer();
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
