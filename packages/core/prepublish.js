const fs = require('fs');
const { devDependencies, license, ...pkg } = require('./package.json');

const env = (process.env.ENVIRONMENT || 'staging').replace('refs/heads/', '');

const tag = env === 'main' ? 'latest' : env;

fs.writeFileSync(
  './package.json',
  JSON.stringify(
    {
      ...pkg,
      name: process.env.GHR === 'true' ? '@dyte-in/ui-kit' : '@dytesdk/ui-kit',
      publishConfig: process.env.GHR === 'true' || !env.includes('main') ? { tag } : publishConfig,
      scripts: {
        postpublish: pkg.scripts.postpublish,
      },
    },
    null,
    2
  )
);
