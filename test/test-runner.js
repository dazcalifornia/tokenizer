/**
 * @file test-runner.js
 * @description Test runner for tokenizer evaluation
 */

const Tokenizer = require("../src/tokenizer");
const testCases = require("./test-cases");

// Create a tokenizer instance
const tokenizer = new Tokenizer();

/**
 * Run a test case and print results
 * @param {string} name - Test name
 * @param {string} text - Text to tokenize
 * @param {string} description - Test description
 */
function runTest(name, text, description) {
  console.log(`\n----- ${name} -----`);
  console.log(`Text: ${text}`);
  if (description) {
    console.log(`Description: ${description}`);
  }

  const tokens = tokenizer.tokenize(text);
  console.log(`Tokens (${tokens.length}): ${JSON.stringify(tokens)}`);

  return tokens;
}

/**
 * Run tests for a category
 * @param {string} categoryName - Category name
 * @param {Object|Array} tests - Test cases
 */
function runCategory(categoryName, tests) {
  console.log(`\n\n========== ${categoryName.toUpperCase()} ==========`);

  if (Array.isArray(tests)) {
    // Handle flat array of tests
    tests.forEach((test) => {
      runTest(test.name, test.text, test.description);
    });
  } else {
    // Handle nested subcategories
    Object.entries(tests).forEach(([subcategoryName, subcategoryTests]) => {
      console.log(`\n=== ${subcategoryName.toUpperCase()} ===`);
      subcategoryTests.forEach((test) => {
        runTest(test.name, test.text, test.description);
      });
    });
  }
}

// Run all test categories
Object.entries(testCases).forEach(([categoryName, tests]) => {
  runCategory(categoryName, tests);
});

console.log("\n\n========== TEST SUMMARY ==========");
console.log(`Total categories: ${Object.keys(testCases).length}`);

let totalTests = 0;
Object.values(testCases).forEach((category) => {
  if (Array.isArray(category)) {
    totalTests += category.length;
  } else {
    Object.values(category).forEach((subCategory) => {
      totalTests += subCategory.length;
    });
  }
});

console.log(`Total test cases: ${totalTests}`);
console.log("All tests completed!");
