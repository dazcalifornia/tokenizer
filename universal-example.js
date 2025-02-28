/**
 * @file universal-example.js
 * @description Example of universal tokenization using regex pattern
 */

const Tokenizer = require("./tokenizer");

// Create a universal tokenizer
const tokenizer = new Tokenizer();

// Test with various languages
console.log("===== Multilingual Tokenization Examples =====");

// English
const englishText =
  "Natural language processing (NLP) is a subfield of linguistics and AI.";
console.log("\nEnglish:", englishText);
console.log(tokenizer.tokenize(englishText));

// Thai (without dictionary)
const thaiText = "ภาษาไทยเป็นภาษาที่พูดในประเทศไทย";
console.log("\nThai:", thaiText);
console.log(tokenizer.tokenize(thaiText));

// Chinese
const chineseText = "自然语言处理是语言学和人工智能的一个子领域";
console.log("\nChinese:", chineseText);
console.log(tokenizer.tokenize(chineseText));

// Arabic
const arabicText =
  "معالجة اللغة الطبيعية هي أحد فروع اللغويات والذكاء الاصطناعي";
console.log("\nArabic:", arabicText);
console.log(tokenizer.tokenize(arabicText));

// Hindi
const hindiText =
  "प्राकृतिक भाषा प्रसंस्करण भाषाविज्ञान और कृत्रिम बुद्धि का एक उपक्षेत्र है";
console.log("\nHindi:", hindiText);
console.log(tokenizer.tokenize(hindiText));

// Russian
const russianText =
  "Обработка естественного языка - это подобласть лингвистики и искусственного интеллекта";
console.log("\nRussian:", russianText);
console.log(tokenizer.tokenize(russianText));

// Japanese
const japaneseText = "自然言語処理は言語学と人工知能の一分野です";
console.log("\nJapanese:", japaneseText);
console.log(tokenizer.tokenize(japaneseText));

// Mixed text with numbers and multiple languages
const mixedText = "This is ภาษาไทย and 中文 with अरबी and numbers 123456";
console.log("\nMixed languages:", mixedText);
console.log(tokenizer.tokenize(mixedText));
