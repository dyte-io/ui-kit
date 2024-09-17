const emojis = require('./emojis.json');

const output = { emojis: [], search: '' };

const indices = [];

for (const [emoji, data] of Object.entries(emojis)) {
  if (Number(data.emoji_version) < 5) {
    const index = output.emojis.push(emoji) - 1;
    indices.push(`${data.name}:${index}`);
  }
}

output.search = indices.join(',');

const fs = require('fs');

fs.writeFileSync('./emojis-data.json', JSON.stringify(output));
