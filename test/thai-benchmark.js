/**
 * @file thai-benchmark.js
 * @description Benchmark different Thai tokenization approaches
 */

const Tokenizer = require("../src/tokenizer");
const fs = require("fs");
const path = require("path");

// Create Thai test dictionary
const createThaiDictionary = () => {
  const thaiWords = [
    // Common Thai words
    "การ",
    "ของ",
    "และ",
    "ใน",
    "ที่",
    "มี",
    "ความ",
    "เป็น",
    "ไม่",
    "ได้",
    "ให้",
    "จะ",
    "มา",
    "กับ",
    "โดย",
    "แต่",
    "หรือ",
    "คน",
    "ต้อง",
    "ทำ",
    "อยู่",
    "จาก",
    "นี้",
    "ไป",
    "ถึง",
    "เมื่อ",
    "เพื่อ",
    "จึง",
    "ขึ้น",
    "เรา",
    "ก็",
    "ว่า",
    "ดี",
    "แล้ว",
    "คือ",
    "ตาม",
    "เช่น",
    "อย่าง",
    "นั้น",
    "เรื่อง",
    "เขา",
    "ฉัน",
    "ผม",
    "ดิฉัน",

    // Domain-specific words
    "ภาษา",
    "ไทย",
    "กรุงเทพ",
    "มหานคร",
    "ประเทศ",
    "วิทยาศาสตร์",
    "คอมพิวเตอร์",
    "ปัญญาประดิษฐ์",
    "การประมวลผล",
    "ธรรมชาติ",
    "สวัสดี",
    "ขอบคุณ",
    "รัฐบาล",
    "นายกรัฐมนตรี",
    "สุขภาพ",
    "โรงพยาบาล",
    "แพทย์",
    "เศรษฐกิจ",
    "ธุรกิจ",

    // Longer compound words
    "การประมวลผลภาษาธรรมชาติ",
    "การเรียนรู้เชิงลึก",
    "ปัญญาประดิษฐ์เชิงทั่วไป",
    "ระบบแนะนำคอนเทนต์",
    "การประมวลผลแบบกลุ่มเมฆ",
  ];

  // Create data directory if it doesn't exist
  const dataDir = path.join(__dirname, "../data/dictionaries");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dictionaryPath = path.join(dataDir, "thai-benchmark-dict.txt");
  fs.writeFileSync(dictionaryPath, thaiWords.join("\n"), "utf8");
  console.log(
    `Created Thai dictionary with ${thaiWords.length} words at ${dictionaryPath}`,
  );
  return dictionaryPath;
};

// Test sentences in Thai
const thaiTestCases = [
  {
    name: "Simple greeting",
    text: "สวัสดีครับ ผมชื่อโทมัส",
  },
  {
    name: "Basic statement",
    text: "วันนี้อากาศดีมาก",
  },
  {
    name: "Technical content",
    text: "การประมวลผลภาษาธรรมชาติเป็นสาขาหนึ่งของปัญญาประดิษฐ์",
  },
  {
    name: "Mixed Thai-English",
    text: "ผมทำงานเป็น software engineer ที่บริษัทในกรุงเทพฯ",
  },
  {
    name: "News headline",
    text: "นายกรัฐมนตรีประกาศมาตรการใหม่เพื่อกระตุ้นเศรษฐกิจ",
  },
  {
    name: "Complex sentence with numbers",
    text: "ประชากรของประเทศไทยมีประมาณ 70 ล้านคนในปี 2023",
  },
  {
    name: "Long complex sentence",
    text: "การพัฒนาระบบประมวลผลภาษาไทยมีความท้าทายเนื่องจากลักษณะเฉพาะของภาษาไทยที่ไม่มีการแบ่งคำด้วยช่องว่างและมีความกำกวมในการตัดคำ",
  },
];

// Main function to run the benchmark
function runThaiTokenizationBenchmark() {
  console.log("\n========== THAI TOKENIZATION BENCHMARK ==========\n");

  // Create tokenizers
  const regexTokenizer = new Tokenizer();
  const dictionaryPath = createThaiDictionary();
  const dictionaryTokenizer = new Tokenizer({ language: "th" });
  dictionaryTokenizer.loadThaiDictionarySync(dictionaryPath);
  const simpleThaiTokenizer = new Tokenizer({ language: "th" }); // No dictionary

  thaiTestCases.forEach((testCase, index) => {
    console.log(`\n----- Test Case ${index + 1}: ${testCase.name} -----`);
    console.log(`Text: ${testCase.text}`);

    // 1. Regex-based tokenization
    console.time("Regex tokenization");
    const regexTokens = regexTokenizer.tokenize(testCase.text);
    console.timeEnd("Regex tokenization");
    console.log(
      `Regex tokens (${regexTokens.length}): ${JSON.stringify(regexTokens)}`,
    );

    // 2. Dictionary-based tokenization
    console.time("Dictionary tokenization");
    const dictTokens = dictionaryTokenizer.tokenize(testCase.text);
    console.timeEnd("Dictionary tokenization");
    console.log(
      `Dictionary tokens (${dictTokens.length}): ${JSON.stringify(dictTokens)}`,
    );

    // 3. Simple Thai tokenization (without dictionary)
    console.time("Simple Thai tokenization");
    const simpleTokens = simpleThaiTokenizer.tokenize(testCase.text);
    console.timeEnd("Simple Thai tokenization");
    console.log(
      `Simple Thai tokens (${simpleTokens.length}): ${JSON.stringify(simpleTokens)}`,
    );
  });

  console.log("\nBenchmark completed!");
}

// Run the benchmark
runThaiTokenizationBenchmark();
