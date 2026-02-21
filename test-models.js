const fs = require('fs');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test(modelName) {
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        await model.generateContent("Say hi");
        console.log(`✅ ${modelName} worked!`);
        return true;
    } catch (err) {
        console.log(`❌ ${modelName} failed: ${err.message.split('\n')[0]}`);
        return false;
    }
}

async function run() {
    await test('gemini-2.5-flash');
    await test('gemini-flash-latest');
    await test('gemini-2.0-flash-lite-001');
}

run();
