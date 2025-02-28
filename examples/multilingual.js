/**
 * @file multilingual.js
 * @description Multilingual tokenization examples
 */

const Tokenizer = require("../src/tokenizer");

// Create a universal tokenizer
const tokenizer = new Tokenizer();

console.log("\n========== MULTILINGUAL TOKENIZATION ==========\n");

// Helper function to test tokenization
function testLanguage(name, code, text) {
  console.log(`\n----- ${name} (${code}) -----`);
  console.log(`Original: ${text}`);
  const tokens = tokenizer.tokenize(text);
  console.log(`Tokens (${tokens.length}): ${JSON.stringify(tokens)}`);
  return tokens;
}

// Test various languages

// 1. English
testLanguage(
  "English",
  "en",
  "Natural language processing is a fascinating field of AI research.",
);

// 2. Thai
testLanguage("Thai", "th", "ภาษาไทยเป็นภาษาที่ใช้พูดในประเทศไทย");

// 3. Chinese
testLanguage("Chinese", "zh", "自然语言处理是人工智能的一个子领域");

// 4. Japanese
testLanguage("Japanese", "ja", "自然言語処理は人工知能の一分野です");

// 5. Korean
testLanguage("Korean", "ko", "자연어 처리는 인공 지능의 한 분야입니다");

// 6. Arabic
testLanguage(
  "Arabic",
  "ar",
  "معالجة اللغة الطبيعية هي فرع من فروع الذكاء الاصطناعي",
);

// 7. Hebrew
testLanguage("Hebrew", "he", "עיבוד שפה טבעית הוא תחום של בינה מלאכותית");

// 8. Russian
testLanguage(
  "Russian",
  "ru",
  "Обработка естественного языка - это область искусственного интеллекта",
);

// 9. Hindi
testLanguage(
  "Hindi",
  "hi",
  "प्राकृतिक भाषा प्रसंस्करण कृत्रिम बुद्धिमत्ता का एक क्षेत्र है",
);

// 10. Vietnamese
testLanguage(
  "Vietnamese",
  "vi",
  "Xử lý ngôn ngữ tự nhiên là một lĩnh vực của trí tuệ nhân tạo",
);

// 11. Turkish
testLanguage("Turkish", "tr", "Doğal dil işleme, yapay zekanın bir alanıdır");

// 12. Greek
testLanguage(
  "Greek",
  "el",
  "Η επεξεργασία φυσικής γλώσσας είναι ένας τομέας της τεχνητής νοημοσύνης",
);

// Mixed script text
console.log("\n----- Mixed Scripts -----");
const mixedText =
  "This is English, これは日本語です, นี่คือภาษาไทย, 这是中文, هذه هي اللغة العربية";
console.log(`Original: ${mixedText}`);
const mixedTokens = tokenizer.tokenize(mixedText);
console.log(`Tokens (${mixedTokens.length}): ${JSON.stringify(mixedTokens)}`);

// Social media style text with emojis and hashtags
console.log("\n----- Social Media Text -----");
const socialText =
  "Just landed in Bangkok! กรุงเทพฯสวยมาก 😍 #Thailand #vacation";
console.log(`Original: ${socialText}`);
const socialTokens = tokenizer.tokenize(socialText);
console.log(`Tokens (${socialTokens.length}): ${JSON.stringify(socialTokens)}`);

// Technical text with numbers and symbols
console.log("\n----- Technical Text -----");
const technicalText =
  "The model achieved 97.8% accuracy on the test set (p < 0.001)";
console.log(`Original: ${technicalText}`);
const technicalTokens = tokenizer.tokenize(technicalText);
console.log(
  `Tokens (${technicalTokens.length}): ${JSON.stringify(technicalTokens)}`,
);

// Medical text with abbreviations
console.log("\n----- Medical Text -----");
const medicalText = "Pt presents with SOB, HR 110, BP 140/90, O2 sat 92% on RA";
console.log(`Original: ${medicalText}`);
const medicalTokens = tokenizer.tokenize(medicalText);
console.log(
  `Tokens (${medicalTokens.length}): ${JSON.stringify(medicalTokens)}`,
);

console.log("\n========== END OF MULTILINGUAL EXAMPLES ==========\n");
