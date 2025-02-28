/**
 * @file test-cases.js
 * @description Test cases for tokenizer evaluation across languages and use cases
 */

// Define test categories and their test cases
module.exports = {
  // East Asian Languages
  eastAsian: {
    japanese: [
      {
        name: "Simple sentence",
        text: "私は日本語を勉強しています。",
        description: "I am studying Japanese language",
      },
      {
        name: "Mixed scripts",
        text: "今日は土曜日です。天気がいいです。",
        description: "Today is Saturday. The weather is good.",
      },
      {
        name: "Technical content",
        text: "自然言語処理は人工知能の一分野です。",
        description:
          "Natural language processing is a field of artificial intelligence",
      },
    ],
    chinese: [
      {
        name: "Simple sentence",
        text: "我正在学习中文。",
        description: "I am learning Chinese.",
      },
      {
        name: "News headline",
        text: "科学家发现新的人工智能应用",
        description: "Scientists discover new AI application",
      },
    ],
    korean: [
      {
        name: "Simple sentence",
        text: "한국어는 재미있고 아름다운 언어입니다.",
        description: "Korean is a fun and beautiful language.",
      },
      {
        name: "With spaces",
        text: "자연어 처리는 인공 지능의 한 분야입니다.",
        description:
          "Natural language processing is a field of artificial intelligence",
      },
    ],
    thai: [
      {
        name: "Simple greeting",
        text: "สวัสดีครับ ผมชื่อโทมัส",
        description: "Hello, my name is Thomas",
      },
      {
        name: "Technical content",
        text: "การประมวลผลภาษาธรรมชาติเป็นสาขาหนึ่งของปัญญาประดิษฐ์",
        description:
          "Natural language processing is a branch of artificial intelligence",
      },
    ],
  },

  // Semitic Languages
  semitic: {
    arabic: [
      {
        name: "Simple sentence",
        text: "اللغة العربية جميلة جدا.",
        description: "Arabic language is very beautiful.",
      },
      {
        name: "Technical content",
        text: "معالجة اللغة الطبيعية هي مجال من مجالات الذكاء الاصطناعي.",
        description:
          "Natural language processing is a field of artificial intelligence.",
      },
    ],
    hebrew: [
      {
        name: "Simple sentence",
        text: "אני לומד עברית.",
        description: "I am learning Hebrew.",
      },
      {
        name: "With punctuation",
        text: "שלום, מה שלומך? אני בסדר, תודה!",
        description: "Hello, how are you? I'm fine, thanks!",
      },
    ],
  },

  // Languages with diacritics
  diacritics: {
    vietnamese: [
      {
        name: "Simple sentence",
        text: "Tiếng Việt có nhiều dấu.",
        description: "Vietnamese has many diacritics.",
      },
      {
        name: "Complex diacritics",
        text: "Xin chào, tôi đang học tiếng Việt.",
        description: "Hello, I am learning Vietnamese.",
      },
    ],
    turkish: [
      {
        name: "Simple sentence",
        text: "Türkçe öğrenmek zor değil.",
        description: "Learning Turkish is not difficult.",
      },
      {
        name: "With special characters",
        text: "Güneşli bir günde İstanbul'da yürüyüş yapmak hoşuma gidiyor.",
        description: "I enjoy walking in Istanbul on a sunny day.",
      },
    ],
  },

  // Social media and mixed text
  social: [
    {
      name: "Multilingual with emojis and hashtags",
      text: "Just landed in Bangkok! กรุงเทพฯสวยมาก 😍 #Thailand #vacation https://example.com/photos",
      description:
        "Social media post with Thai, English, emoji, hashtags and URL",
    },
    {
      name: "Code-switching",
      text: "วันนี้ร้อนมาก! I'm melting like ice cream 🥵 #summer #heat",
      description: "Tweet with Thai-English code-switching",
    },
    {
      name: "Mentions and slang",
      text: "OMG @friend this concert was lit AF!!! น่าตื่นเต้นมาก can't wait 4 the next 1 😎",
      description: "Social post with mentions and internet slang",
    },
  ],

  // Clinical and technical text
  technical: [
    {
      name: "Medical report",
      text: "Patient presents with BP 120/80 mmHg, HR 72bpm. Dx: T2DM with peripheral neuropathy. Rx: Metformin 500mg BID.",
      description: "Medical report with abbreviations and measurements",
    },
    {
      name: "Thai clinical notes",
      text: "ผู้ป่วยมีไข้ 38.5°C และ O2 sat 95%. ให้ paracetamol 500mg ทุก 6 ชั่วโมง.",
      description: "Thai clinical notes with measurements",
    },
    {
      name: "Programming code",
      text: "function calculateBMI(weight, height) { return weight / (height * height); }",
      description: "JavaScript function",
    },
    {
      name: "SQL query",
      text: "SELECT patient_name, diagnosis, admission_date FROM patients WHERE age > 65 ORDER BY admission_date DESC;",
      description: "SQL query",
    },
  ],

  // Mixed scripts
  mixed: [
    {
      name: "Multiple scripts",
      text: "This is English, これは日本語です, นี่คือภาษาไทย, 这是中文, هذه هي اللغة العربية, 이것은 한국어입니다.",
      description: "Text with 6 different scripts",
    },
    {
      name: "Technical terms",
      text: "Deep Learning (深度学习, 딥 러닝, ディープラーニング) has applications in NLP, CV, and RL.",
      description: "Technical terms in multiple languages",
    },
  ],
};
