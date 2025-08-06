const fs = require('fs');
if (!fs.existsSync('./dist/package.json')) {
  throw new Error('Angular UI Kit dist not found');
}
const pkg = require('./dist/package.json');

const dependencies = {
  ...pkg.dependencies,
  '@dytesdk/ui-kit': pkg.version,
};

const env = (process.env.ENVIRONMENT || 'staging').replace('refs/heads/', '');

const tag = env == 'main' ? 'latest' : env;

fs.writeFileSync(
  './dist/package.json',
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
