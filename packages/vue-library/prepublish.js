const fs = require('fs');
const pkg = require('./package.json');

const dependencies = {
  ...pkg.dependencies,
  '@dytesdk/ui-kit': `^${pkg.version}`,
};

const env = (process.env.ENVIRONMENT || 'staging').replace('refs/heads/', '');

const tag = env === 'main' ? 'latest' : env;

fs.writeFileSync(
  './package.json',
  JSON.stringify(
    {
      ...pkg,
      name: process.env.GHR === 'true' ? '@dyte-in/vue-ui-kit' : '@dytesdk/vue-ui-kit',
      dependencies,
      scripts: {
        postpublish: pkg.scripts.postpublish,
      },
      publishConfig:
        process.env.GHR === 'true' || !env.includes('main') ? { tag } : pkg.publishConfig,
    },
    null,
    2
  )
);
