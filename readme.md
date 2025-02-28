# Universal Word Tokenizer for Node.js

A flexible multilingual word tokenization library for Node.js that uses Unicode-aware regular expressions to work effectively across many languages, including those without word boundaries like Thai, Chinese, and Japanese.

## Features

- **Universal tokenization** using Unicode-aware regex patterns
- **Multilingual support** for virtually any language script
- **Thai language support** with optional dictionary-based tokenization
- **Stopword removal** for better text processing
- **Stemming** for Latin-based languages
- **N-gram generation** for advanced text analysis
- **Token frequency analysis**

## Project Structure

```
node-word-tokenizer/
├── src/
│   ├── tokenizer.js       # Core tokenizer implementation
│   ├── languages/
│   │   └── thai.js        # Thai-specific tokenization logic
│   └── utils/
│       └── stemmer.js     # Stemming implementation
├── examples/
│   ├── basic.js           # Basic usage examples
│   ├── multilingual.js    # Multilingual examples
│   └── analysis.js        # Text analysis application
├── test/
│   ├── test-runner.js     # Main test script
│   ├── test-cases.js      # Test cases for different languages
│   └── thai-benchmark.js  # Thai-specific benchmark
├── data/
│   ├── stopwords/         # Stopword lists for various languages
│   │   ├── en.json        # English stopwords
│   │   └── th.json        # Thai stopwords
│   └── dictionaries/      # Dictionary files
│       └── thai-dict.txt  # Sample Thai dictionary
├── package.json           # Project configuration
└── README.md              # Documentation
```

## Installation

```bash
npm install node-word-tokenizer
```

Or clone the repository:

```bash
git clone https://github.com/yourusername/node-word-tokenizer.git
cd node-word-tokenizer
npm install
```

## Basic Usage

```javascript
const Tokenizer = require("node-word-tokenizer");

// Create a basic tokenizer
const tokenizer = new Tokenizer();

// Tokenize text in any language
const text = "Natural language processing is fascinating!";
const tokens = tokenizer.tokenize(text);
console.log(tokens);

// Works with Thai and other non-spaced languages
const thaiText = "ภาษาไทยเป็นภาษาที่น่าสนใจ";
const thaiTokens = tokenizer.tokenize(thaiText);
console.log(thaiTokens);
```

## Advanced Options

```javascript
// Create a tokenizer with custom options
const tokenizer = new Tokenizer({
  lowercase: true, // Convert to lowercase
  removeStopwords: true, // Remove common words
  stemming: true, // Apply stemming (for Latin scripts)
  customStopwords: ["foo", "bar"], // Add custom stopwords
  language: "th", // Specify language (for special handling)
  thaiDictionary: null, // Optional Thai dictionary
});
```

## Thai Language Support

For Thai language, you can use either:

### 1. Universal regex-based tokenization (default)

```javascript
const tokenizer = new Tokenizer();
tokenizer.tokenize("ภาษาไทยน่าสนใจ");
```

### 2. Dictionary-based tokenization (more accurate)

```javascript
const thaiTokenizer = new Tokenizer({ language: "th" });

// Load a Thai dictionary
thaiTokenizer.loadThaiDictionarySync("./path/to/thai-dict.txt");

// Tokenize with the dictionary
thaiTokenizer.tokenize("ภาษาไทยน่าสนใจ");
```

## Examples

The package includes several example scripts:

```bash
# Basic usage examples
npm run example:basic

# Multilingual tokenization examples
npm run example:multi

# Text analysis application
npm run example:analysis

# Run test suite
npm test

# Thai tokenization benchmark
npm run benchmark:thai
```

## Advanced Tokenization Methods

### N-gram Tokenization

```javascript
// Generate bigrams
const bigrams = tokenizer.ngramTokenize("Natural language processing", 2);
// Result: ["Natural language", "language processing"]
```

### Token Frequency Analysis

```javascript
// Count word frequencies
const frequency = tokenizer.getTokenFrequency("the cat in the hat");
// Result: { "the": 2, "cat": 1, "in": 1, "hat": 1 }
```

## Handling Mixed Scripts

The tokenizer handles text with mixed scripts effectively:

```javascript
const mixedText = "English, 日本語, ภาษาไทย, العربية";
tokenizer.tokenize(mixedText);
// Correctly separates tokens in different scripts
```

## Performance

The universal regex approach offers a good balance between speed and accuracy for most languages. For Thai and other languages without word boundaries, the dictionary-based approach provides better accuracy at the cost of requiring a dictionary and additional processing time.

## License

MIT
