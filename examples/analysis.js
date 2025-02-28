/**
 * @file analysis.js
 * @description Text analysis application using the tokenizer
 */

const Tokenizer = require("../src/tokenizer");
const fs = require("fs");
const path = require("path");

// Create data directory if needed
const dataDir = path.join(__dirname, "../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Sample multilingual social media data
const samplePosts = [
  {
    id: 1,
    user: "traveler123",
    text: "Just landed in Bangkok! กรุงเทพฯสวยมาก 😍 #Thailand #vacation",
    language: "en-th", // English-Thai
    timestamp: "2025-02-24T12:30:00Z",
  },
  {
    id: 2,
    user: "techguru",
    text: "AI 人工知能は現代のテクノロジーの中で最も重要な分野の一つです。#AI #MachineLearning",
    language: "ja", // Japanese
    timestamp: "2025-02-24T14:45:00Z",
  },
  {
    id: 3,
    user: "foodlover",
    text: "Delicious tom yum soup for lunch today! ต้มยำกุ้งอร่อยมากๆ 🍜 #ThaiFood",
    language: "en-th", // English-Thai
    timestamp: "2025-02-24T13:15:00Z",
  },
  {
    id: 4,
    user: "newsreader",
    text: "Breaking: ประธานาธิบดีสหรัฐฯเดินทางเยือนประเทศไทยวันพรุ่งนี้ #News #Politics",
    language: "th", // Thai
    timestamp: "2025-02-24T16:20:00Z",
  },
  {
    id: 5,
    user: "developer",
    text: "دعم اللغة العربية مهم جدا في تطبيقات معالجة اللغات الطبيعية #NLP #Arabic",
    language: "ar", // Arabic
    timestamp: "2025-02-24T18:10:00Z",
  },
  {
    id: 6,
    user: "langlearner",
    text: "Learning Korean is fun! 한국어를 배우는 것은 재미있어요! #LanguageLearning",
    language: "en-ko", // English-Korean
    timestamp: "2025-02-24T19:05:00Z",
  },
  {
    id: 7,
    user: "sportsfan",
    text: "เชียร์ทีมชาติไทยสู้ๆ! Going to the match tonight. #Football #Thailand",
    language: "th-en", // Thai-English
    timestamp: "2025-02-24T20:30:00Z",
  },
  {
    id: 8,
    user: "codetester",
    text: "Testing my new regex: \\p{L}+(?:\\p{M}*\\p{L}+)*|\\p{N}+ for multilingual text processing",
    language: "en", // English
    timestamp: "2025-02-24T21:15:00Z",
  },
];

// Save sample data to a file
fs.writeFileSync(
  path.join(dataDir, "sample-posts.json"),
  JSON.stringify(samplePosts, null, 2),
  "utf8",
);

// Analysis class
class MultilingualTextAnalyzer {
  constructor(tokenizer) {
    this.tokenizer = tokenizer;
    this.languageStats = {};
    this.topHashtags = {};
    this.wordFrequencies = {};
    this.totalPosts = 0;
  }

  // Analyze posts
  analyze(posts) {
    this.totalPosts = posts.length;

    posts.forEach((post) => {
      // Track languages
      const languages = post.language.split("-");
      languages.forEach((lang) => {
        this.languageStats[lang] = (this.languageStats[lang] || 0) + 1;
      });

      // Tokenize the text
      const tokens = this.tokenizer.tokenize(post.text);

      // Extract hashtags
      const hashtags = tokens.filter((token) => token.startsWith("#"));
      hashtags.forEach((tag) => {
        this.topHashtags[tag] = (this.topHashtags[tag] || 0) + 1;
      });

      // Count word frequencies (excluding hashtags)
      const words = tokens.filter((token) => !token.startsWith("#"));
      words.forEach((word) => {
        this.wordFrequencies[word] = (this.wordFrequencies[word] || 0) + 1;
      });
    });

    return this;
  }

  // Get top terms by frequency
  getTopTerms(count = 10) {
    return Object.entries(this.wordFrequencies)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([term, freq]) => ({ term, frequency: freq }));
  }

  // Get top hashtags
  getTopHashtags(count = 10) {
    return Object.entries(this.topHashtags)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([tag, freq]) => ({ tag, frequency: freq }));
  }

  // Get language distribution
  getLanguageDistribution() {
    const result = {};
    Object.entries(this.languageStats).forEach(([lang, count]) => {
      result[lang] = (count / this.totalPosts) * 100;
    });
    return result;
  }

  // Print summary report
  printReport() {
    console.log("\n========== MULTILINGUAL TEXT ANALYSIS REPORT ==========\n");

    console.log("ANALYZED POSTS:", this.totalPosts);

    console.log("\nLANGUAGE DISTRIBUTION (%):");
    const langDist = this.getLanguageDistribution();
    Object.entries(langDist).forEach(([lang, percentage]) => {
      console.log(`  ${lang}: ${percentage.toFixed(1)}%`);
    });

    console.log("\nTOP HASHTAGS:");
    this.getTopHashtags(5).forEach((item, i) => {
      console.log(`  ${i + 1}. ${item.tag} (${item.frequency})`);
    });

    console.log("\nTOP TERMS:");
    this.getTopTerms(10).forEach((item, i) => {
      console.log(`  ${i + 1}. ${item.term} (${item.frequency})`);
    });

    console.log("\n==================================================\n");
  }

  // Generate sentiment analysis (simple example)
  analyzeSentiment(posts) {
    // Basic positive/negative lexicon (just as an example)
    const positiveLexicon = new Set([
      "good",
      "great",
      "excellent",
      "amazing",
      "wonderful",
      "love",
      "best",
      "awesome",
      "delicious",
      "beautiful",
      "fun",
      "happy",
      "enjoy",
      "nice",
    ]);

    const negativeLexicon = new Set([
      "bad",
      "awful",
      "terrible",
      "worst",
      "hate",
      "dislike",
      "poor",
      "disappointing",
      "horrible",
      "annoying",
      "sad",
      "boring",
      "difficult",
    ]);

    const results = posts.map((post) => {
      const tokens = this.tokenizer.tokenize(post.text.toLowerCase());

      let positiveScore = 0;
      let negativeScore = 0;

      tokens.forEach((token) => {
        if (positiveLexicon.has(token.toLowerCase())) positiveScore++;
        if (negativeLexicon.has(token.toLowerCase())) negativeScore++;
      });

      const sentimentScore = positiveScore - negativeScore;
      let sentiment = "neutral";
      if (sentimentScore > 0) sentiment = "positive";
      if (sentimentScore < 0) sentiment = "negative";

      return {
        id: post.id,
        user: post.user,
        sentiment,
        score: sentimentScore,
        positive: positiveScore,
        negative: negativeScore,
      };
    });

    return results;
  }
}

// Run the application
console.log("========== MULTILINGUAL TEXT ANALYSIS APPLICATION ==========");
console.log(
  `\nAnalyzing ${samplePosts.length} social media posts in multiple languages...`,
);

// Create a tokenizer with stopwords removal
const tokenizer = new Tokenizer({
  removeStopwords: true,
});

// Add social media stopwords
tokenizer.addStopwords([
  "rt",
  "like",
  "just",
  "lol",
  "omg",
  "wow",
  "yeah",
  "https",
  "http",
  "com",
  "www",
  "amp",
]);

// Create analyzer and analyze posts
const analyzer = new MultilingualTextAnalyzer(tokenizer);
analyzer.analyze(samplePosts).printReport();

// Run sentiment analysis
console.log("\n========== SIMPLE SENTIMENT ANALYSIS ==========\n");
const sentimentResults = analyzer.analyzeSentiment(samplePosts);

sentimentResults.forEach((result) => {
  console.log(`User: ${result.user}`);
  console.log(`Sentiment: ${result.sentiment} (Score: ${result.score})`);
  console.log(
    `Positive words: ${result.positive}, Negative words: ${result.negative}`,
  );
  console.log("---");
});

console.log("\nApplication completed!");
