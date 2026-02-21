const fs = require('fs');
const dotenv = require('dotenv');

// Load env
const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
const key = envConfig.GEMINI_API_KEY;

fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + key)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("API ERROR:", data.error.message);
        } else {
            console.log("AVAILABLE MODELS:");
            console.log(data.models.map(m => m.name).join('\n'));
        }
    })
    .catch(err => console.error(err));
