/**
 * @file thai-example.js
 * @description Example usage of the Tokenizer library with Thai language
 */

const Tokenizer = require("./tokenizer");
const fs = require("fs");
const path = require("path");

// Create a simple Thai dictionary file (if it doesn't exist)
const dictionaryPath = path.join(__dirname, "thai-dict.txt");
if (!fs.existsSync(dictionaryPath)) {
  // Sample Thai words - in a real implementation, you'd use a comprehensive dictionary
  const sampleThaiWords = [
    "ไทย", // thai
    "ภาษา", // language
    "คอมพิวเตอร์", // computer
    "ประเทศ", // country
    "กรุงเทพ", // Bangkok
    "มหานคร", // metropolis
    "ข้าว", // rice
    "น้ำ", // water
    "อาหาร", // food
    "รถยนต์", // car
    "เรียน", // learn
    "หนังสือ", // book
    "ผม", // I (male)
    "ดิฉัน", // I (female)
    "เธอ", // you
    "เขา", // he/she
    "และ", // and
    "หรือ", // or
    "แต่", // but
    "กิน", // eat
    "ดื่ม", // drink
    "เดิน", // walk
    "วิ่ง", // run
    "นอน", // sleep
    "ใหญ่", // big
    "เล็ก", // small
    "ดี", // good
    "ไม่ดี", // not good
    "เร็ว", // fast
    "ช้า", // slow
    "สวย", // beautiful
    "ที่", // at
    "ใน", // in
    "บน", // on
    "ล่าง", // under
    "สูง", // tall
    "ต่ำ", // short
    "มาก", // many
    "น้อย", // few
    "ทำงาน", // work
    "วันนี้", // today
    "เมื่อวาน", // yesterday
    "พรุ่งนี้", // tomorrow
  ];

  fs.writeFileSync(dictionaryPath, sampleThaiWords.join("\n"), "utf8");
  console.log(
    `Created sample Thai dictionary with ${sampleThaiWords.length} words`,
  );
}

// Example Thai text
const thaiText =
  "ภาษาไทยเป็นภาษาที่ใช้พูดในประเทศไทย คอมพิวเตอร์เป็นเครื่องมือที่มีประโยชน์มาก";
// "Thai is a language spoken in Thailand. Computers are very useful tools."

// Create a Thai tokenizer without a dictionary first
console.log("1. Thai tokenization without dictionary:");
const simpleThaiTokenizer = new Tokenizer({ language: "th" });
console.log(simpleThaiTokenizer.tokenize(thaiText));

// Now create a Thai tokenizer with a dictionary
console.log("\n2. Thai tokenization with dictionary:");
const thaiTokenizer = new Tokenizer({ language: "th" });

// Load the dictionary synchronously
thaiTokenizer.loadThaiDictionarySync(dictionaryPath);

// Tokenize Thai text
const tokens = thaiTokenizer.tokenize(thaiText);
console.log(tokens);

// Add more Thai words to the dictionary
thaiTokenizer.addThaiWords(["เครื่องมือ", "ประโยชน์"]);

// Tokenize again with expanded dictionary
console.log("\n3. Thai tokenization with expanded dictionary:");
console.log(thaiTokenizer.tokenize(thaiText));

// Mixed language example (Thai and English)
const mixedText = "ผมใช้ computer เพื่อทำงาน และเรียนภาษา programming";
// "I use a computer for work and to learn programming languages"

console.log("\n4. Mixed language tokenization:");
console.log(thaiTokenizer.tokenize(mixedText));
