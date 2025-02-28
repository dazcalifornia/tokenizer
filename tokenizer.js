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

    // Add custom stopwords
    this.options.customStopwords.forEach((word) =>
      this.stopwords.add(word.toLowerCase()),
    );
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
      tokens = this.tokenizeThai(text);
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

    // Apply stemming if specified (not applicable for Thai)
    if (this.options.stemming && this.options.language !== "th") {
      tokens = tokens.map((token) => this.stem(token));
    }

    return tokens;
  }

  /**
   * Thai language tokenization using dictionary-based word segmentation
   * @param {string} text - Thai text to tokenize
   * @returns {string[]} Array of Thai tokens
   */
  tokenizeThai(text) {
    if (!text) return [];

    // If no dictionary is provided, use a simple character-based approach
    if (!this.options.thaiDictionary) {
      return this.simpleThaiTokenize(text);
    }

    // Dictionary-based word segmentation using longest matching
    return this.dictionaryThaiTokenize(text);
  }

  /**
   * Simple character-based Thai tokenization (fallback when no dictionary is available)
   * @param {string} text - Thai text to tokenize
   * @returns {string[]} Array of Thai tokens
   */
  simpleThaiTokenize(text) {
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
   * Dictionary-based Thai word segmentation using longest matching
   * @param {string} text - Thai text to tokenize
   * @returns {string[]} Array of Thai tokens
   */
  dictionaryThaiTokenize(text) {
    if (!this.options.thaiDictionary || !this.options.thaiDictionary.size) {
      return this.simpleThaiTokenize(text);
    }

    const tokens = [];
    let remaining = text;

    while (remaining.length > 0) {
      // Try to find the longest matching word from the current position
      let found = false;
      let longestWord = "";

      // Check for matches in the dictionary (longest first)
      for (const word of this.options.thaiDictionary) {
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
   * Simple Porter stemming algorithm
   * @param {string} token - Token to stem
   * @returns {string} Stemmed token
   */
  stem(token) {
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
    try {
      const fs = require("fs");

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error loading Thai dictionary:", err);
          if (callback) callback(err);
          return;
        }

        // Initialize dictionary as a Set for faster lookups
        this.options.thaiDictionary = new Set();

        // Process each line as a dictionary entry
        const words = data.split(/\r?\n/);
        words.forEach((word) => {
          if (word.trim()) {
            this.options.thaiDictionary.add(word.trim());
          }
        });

        console.log(
          `Loaded ${this.options.thaiDictionary.size} Thai words into dictionary`,
        );
        if (callback) callback(null, this.options.thaiDictionary.size);
      });
    } catch (error) {
      console.error("Error loading Thai dictionary:", error);
      if (callback) callback(error);
    }
  }

  /**
   * Load a Thai dictionary synchronously
   * @param {string} filePath - Path to the dictionary file
   * @returns {number} Number of words loaded
   */
  loadThaiDictionarySync(filePath) {
    try {
      const fs = require("fs");
      const data = fs.readFileSync(filePath, "utf8");

      // Initialize dictionary as a Set for faster lookups
      this.options.thaiDictionary = new Set();

      // Process each line as a dictionary entry
      const words = data.split(/\r?\n/);
      words.forEach((word) => {
        if (word.trim()) {
          this.options.thaiDictionary.add(word.trim());
        }
      });

      console.log(
        `Loaded ${this.options.thaiDictionary.size} Thai words into dictionary`,
      );
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
