const fs = require('fs');
const pkg = require('./package.json');

const dependencies = {
  ...pkg.dependencies,
  '@dytesdk/ui-kit': pkg.version,
};

const env = (process.env.ENVIRONMENT || 'staging').replace('refs/heads/', '');

const tag = env == 'main' ? 'latest' : env;

try {
  fs.unlinkSync('./dist/package.json');
  fs.unlinkSync('./dist/README.md');
} catch {}

fs.writeFileSync(
  './package.json',
  JSON.stringify(
    {
      ...pkg,
      license: undefined,
      dependencies,
      name: process.env.GHR === 'true' ? '@dyte-in/angular-ui-kit' : '@dytesdk/angular-ui-kit',
      publishConfig:
        process.env.GHR === 'true' || !env.includes('main') ? { tag } : pkg.publishConfig,
    },
    null,
    2
  )
);
