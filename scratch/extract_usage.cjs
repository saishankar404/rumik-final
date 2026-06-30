const fs = require('fs');

const logPath = '/Users/saishankar/.gemini/antigravity-ide/brain/60101886-5362-4d20-b68b-25c0edf1003c/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(logPath, 'utf8').split('\n');

console.log('Searching in transcript.jsonl...');
for (let i = 0; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  try {
    const obj = JSON.parse(lines[i]);
    const str = JSON.stringify(obj);
    if (str.includes('_app.usage.tsx')) {
      console.log(`Line ${i}: Step ${obj.step_index}, Source: ${obj.source}, Type: ${obj.type}`);
      if (obj.content) {
        console.log('  Content slice:', obj.content.substring(0, 150));
      }
    }
  } catch (e) {}
}
