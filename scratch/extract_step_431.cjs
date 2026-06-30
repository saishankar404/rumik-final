const fs = require('fs');
const path = require('path');

const logPath = '/Users/saishankar/.gemini/antigravity-ide/brain/60101886-5362-4d20-b68b-25c0edf1003c/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(logPath, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  try {
    const obj = JSON.parse(lines[i]);
    if (obj.step_index === 430) {
      if (obj.tool_calls) {
        for (const tc of obj.tool_calls) {
          if (tc.name === 'write_to_file' && tc.args.TargetFile.includes('usage.tsx')) {
            const content = tc.args.CodeContent;
            // Write it to a temporary file in our scratch directory so we can read it directly!
            const outPath = '/Users/saishankar/Desktop/rumik-final/scratch/recovered_usage.tsx';
            fs.mkdirSync(path.dirname(outPath), { recursive: true });
            fs.writeFileSync(outPath, content, 'utf8');
            console.log('RECOVERED AND SAVED TO:', outPath);
          }
        }
      }
      break;
    }
  } catch (e) {}
}
