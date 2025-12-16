const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Read .env.local file
function loadEnv() {
  const envPath = path.join(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf-8');
    const lines = envFile.split('\n');
    lines.forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        process.env[key.trim()] = value;
      }
    });
  }
}

loadEnv();

async function listAvailableModels() {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error('❌ GOOGLE_GEMINI_API_KEY topilmadi .env.local faylida!');
    process.exit(1);
  }

  console.log('🔑 API Key:', apiKey.substring(0, 10) + '...');
  console.log('📋 Mavjud modellarni tekshiryapman...\n');

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    // Try to list models using the REST API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log('✅ Mavjud modellar:\n');

    if (data.models && data.models.length > 0) {
      data.models.forEach((model, index) => {
        if (model.supportedGenerationMethods &&
            model.supportedGenerationMethods.includes('generateContent')) {
          console.log(`${index + 1}. ${model.name}`);
          console.log(`   Display Name: ${model.displayName || 'N/A'}`);
          console.log(`   Methods: ${model.supportedGenerationMethods.join(', ')}`);
          console.log('');
        }
      });

      console.log('\n📝 generateContent metodini qo\'llab-quvvatlovchi modellar:');
      const supportedModels = data.models
        .filter(m => m.supportedGenerationMethods &&
                     m.supportedGenerationMethods.includes('generateContent'))
        .map(m => m.name.replace('models/', ''));

      console.log(supportedModels.join('\n'));
    } else {
      console.log('❌ Hech qanday model topilmadi!');
      console.log('API javob:', JSON.stringify(data, null, 2));
    }

  } catch (error) {
    console.error('❌ Xato:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Test a simple generation with a model
async function testGeneration(modelName) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  console.log(`\n🧪 ${modelName} modelini test qilyapman...`);

  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent('Say hello in one word');
    const response = await result.response;
    const text = response.text();

    console.log(`✅ ${modelName} ishladi!`);
    console.log(`Javob: ${text}`);
    return true;
  } catch (error) {
    console.log(`❌ ${modelName} ishlamadi: ${error.message}`);
    return false;
  }
}

async function main() {
  await listAvailableModels();

  // Try some common model names
  console.log('\n\n🧪 Keng tarqalgan model nomlarini test qilyapman...\n');
  const modelsToTest = [
    'gemini-pro',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-2.0-flash-exp',
  ];

  for (const modelName of modelsToTest) {
    await testGeneration(modelName);
  }
}

main();
