/**
 * @file tokenizer.js
 * @description A flexible word tokenization library for Node.js with universal multi-language support
 *
 * This tokenizer uses Unicode-aware regular expressions that work across many languages.
 * The default pattern \p{L}+(?:\p{M}*\p{L}+)*|\p{N}+ handles most languages including:
 * - English and other Latin-based languages
 * - Thai, Chinese, Japanese and other scripts without word boundaries
 * - Arabic, Hebrew, and other RTL languages
 * - Hindi, Russian, Greek and other non-Latin scripts
 */

// Import language-specific handlers
const thaiTokenizer = require("./languages/thai");

/**
 * Tokenizer class with various tokenization methods
 */
class Tokenizer {
  /**
   * Create a new Tokenizer instance
   * @param {Object} options - Configuration options
   * @param {boolean} options.lowercase - Whether to convert tokens to lowercase
   * @param {boolean} options.removeStopwords - Whether to remove stopwords
   * @param {string[]} options.customStopwords - Additional stopwords to remove
   * @param {boolean} options.stemming - Whether to apply stemming to tokens
   * @param {string} options.language - Language code (e.g., 'en', 'th')
   * @param {Set} options.thaiDictionary - Optional Thai dictionary
   */
  constructor(options = {}) {
    this.options = {
      lowercase: options.lowercase !== undefined ? options.lowercase : true,
      removeStopwords:
        options.removeStopwords !== undefined ? options.removeStopwords : false,
      customStopwords: options.customStopwords || [],
      stemming: options.stemming !== undefined ? options.stemming : false,
      language: options.language || "en",
      thaiDictionary: options.thaiDictionary || null,
    };

    // Import stemmer function
    this.stem = require("./utils/stemmer");

    // Setup stopwords
    this.setupStopwords();
  }

  /**
   * Initialize stopwords from language files and custom list
   */
  setupStopwords() {
    // Default English stopwords
    this.stopwords = new Set([
      "a",
      "an",
      "the",
      "and",
      "or",
      "but",
      "is",
      "are",
      "was",
      "were",
      "be",
      "been",
      "being",
      "in",
      "on",
      "at",
      "to",
      "for",
      "with",
      "by",
      "about",
      "against",
      "between",
      "into",
      "through",
      "during",
      "before",
      "after",
      "above",
      "below",
      "from",
      "up",
      "down",
      "of",
      "off",
      "over",
      "under",
      "again",
      "further",
      "then",
      "once",
      "here",
      "there",
      "when",
      "where",
      "why",
      "how",
      "all",
      "any",
      "both",
      "each",
      "few",
      "more",
      "most",
      "other",
      "some",
      "such",
      "no",
      "nor",
      "not",
      "only",
      "own",
      "same",
      "so",
      "than",
      "too",
      "very",
      "i",
      "me",
      "my",
      "myself",
      "we",
      "our",
      "ours",
      "ourselves",
      "you",
      "your",
      "yours",
      "yourself",
      "yourselves",
      "he",
      "him",
      "his",
      "himself",
      "she",
      "her",
      "hers",
      "herself",
      "it",
      "its",
      "itself",
      "they",
      "them",
      "their",
      "theirs",
      "themselves",
      "what",
      "which",
      "who",
      "whom",
      "this",
      "that",
      "these",
      "those",
      "am",
      "have",
      "has",
      "had",
      "having",
      "do",
      "does",
      "did",
      "doing",
      "would",
      "should",
      "could",
      "ought",
      "i'm",
      "you're",
      "he's",
      "she's",
      "it's",
      "we're",
      "they're",
      "i've",
      "you've",
      "we've",
      "they've",
      "i'd",
      "you'd",
      "he'd",
      "she'd",
      "we'd",
      "they'd",
      "i'll",
      "you'll",
      "he'll",
      "she'll",
      "we'll",
      "they'll",
      "isn't",
      "aren't",
      "wasn't",
      "weren't",
      "hasn't",
      "haven't",
      "hadn't",
      "doesn't",
      "don't",
      "didn't",
      "won't",
      "wouldn't",
      "shan't",
      "shouldn't",
      "can't",
      "cannot",
      "couldn't",
      "mustn't",
      "let's",
      "that's",
      "who's",
      "what's",
      "here's",
      "there's",
      "when's",
      "where's",
      "why's",
      "how's",
    ]);

    // Try to load language-specific stopwords if available
    try {
      if (this.options.language !== "en") {
        const languageStopwords = require(
          `../data/stopwords/${this.options.language}.json`,
        );
        if (Array.isArray(languageStopwords)) {
          languageStopwords.forEach((word) =>
            this.stopwords.add(word.toLowerCase()),
          );
        }
      }
    } catch (error) {
      // Language stopwords not available, continue with English
    }

    // Add custom stopwords
    this.options.customStopwords.forEach((word) => {
      if (typeof word === "string") {
        this.stopwords.add(word.toLowerCase());
      }
    });
  }

  /**
   * Basic word tokenization with multi-language support
   * @param {string} text - Input text to tokenize
   * @returns {string[]} Array of tokens
   */
  tokenize(text) {
    if (!text || typeof text !== "string") {
      return [];
    }

    let tokens = [];

    // Choose tokenization method based on language
    if (this.options.language === "th" && this.options.thaiDictionary) {
      // Use dictionary-based tokenization for Thai if a dictionary is available
      tokens = thaiTokenizer.dictionaryTokenize(
        text,
        this.options.thaiDictionary,
      );
    } else {
      // Use the universal regex-based tokenization for all languages
      // This pattern works across languages including Thai
      // \p{L} matches any Unicode letter
      // \p{M} matches any Unicode mark (combining characters)
      // \p{N} matches any Unicode number/digit
      const universalWordPattern = /\p{L}+(?:\p{M}*\p{L}+)*|\p{N}+/gu;
      tokens = Array.from(text.matchAll(universalWordPattern), (m) => m[0]);
    }

    // Apply lowercase if specified (only for languages where case is applicable)
    if (this.options.lowercase && this.options.language !== "th") {
      tokens = tokens.map((token) => token.toLowerCase());
    }

    // Remove stopwords if specified
    if (this.options.removeStopwords) {
      tokens = tokens.filter(
        (token) => !this.stopwords.has(token.toLowerCase()),
      );
    }

    // Apply stemming if specified (only for supported languages)
    if (
      this.options.stemming &&
      ["en", "es", "fr", "it", "pt", "de", "nl"].includes(this.options.language)
    ) {
      tokens = tokens.map((token) => this.stem(token));
    }

    return tokens;
  }

  /**
   * Tokenize text into word n-grams
   * @param {string} text - Input text to tokenize
   * @param {number} n - Size of n-grams
   * @returns {string[]} Array of n-gram tokens
   */
  ngramTokenize(text, n = 2) {
    if (!text || typeof text !== "string" || n < 1) {
      return [];
    }

    const tokens = this.tokenize(text);
    const ngrams = [];

    for (let i = 0; i <= tokens.length - n; i++) {
      ngrams.push(tokens.slice(i, i + n).join(" "));
    }

    return ngrams;
  }

  /**
   * Count tokens frequency
   * @param {string} text - Input text
   * @returns {Object} Token frequency map
   */
  getTokenFrequency(text) {
    const tokens = this.tokenize(text);
    const frequency = {};

    tokens.forEach((token) => {
      frequency[token] = (frequency[token] || 0) + 1;
    });

    return frequency;
  }

  /**
   * Add custom stopwords
   * @param {string[]} stopwords - Array of stopwords to add
   */
  addStopwords(stopwords) {
    if (Array.isArray(stopwords)) {
      stopwords.forEach((word) => {
        if (typeof word === "string") {
          this.stopwords.add(word.toLowerCase());
        }
      });
    }
  }

  /**
   * Remove stopwords from the stopword list
   * @param {string[]} stopwords - Array of stopwords to remove
   */
  removeStopwords(stopwords) {
    if (Array.isArray(stopwords)) {
      stopwords.forEach((word) => {
        if (typeof word === "string") {
          this.stopwords.delete(word.toLowerCase());
        }
      });
    }
  }

  /**
   * Load a Thai language dictionary from a file
   * @param {string} filePath - Path to the dictionary file
   * @param {function} callback - Callback function after loading
   */
  loadThaiDictionary(filePath, callback) {
    thaiTokenizer.loadDictionary(filePath, (err, dictionary) => {
      if (!err) {
        this.options.thaiDictionary = dictionary;
      }
      if (callback) callback(err, dictionary ? dictionary.size : 0);
    });
  }

  /**
   * Load a Thai dictionary synchronously
   * @param {string} filePath - Path to the dictionary file
   * @returns {number} Number of words loaded
   */
  loadThaiDictionarySync(filePath) {
    try {
      this.options.thaiDictionary = thaiTokenizer.loadDictionarySync(filePath);
      return this.options.thaiDictionary.size;
    } catch (error) {
      console.error("Error loading Thai dictionary:", error);
      return 0;
    }
  }

  /**
   * Add Thai words to the dictionary
   * @param {string[]} words - Array of Thai words to add
   */
  addThaiWords(words) {
    if (!this.options.thaiDictionary) {
      this.options.thaiDictionary = new Set();
    }

    if (Array.isArray(words)) {
      words.forEach((word) => {
        if (typeof word === "string" && word.trim()) {
          this.options.thaiDictionary.add(word.trim());
        }
      });
    }
  }
}

module.exports = Tokenizer;
