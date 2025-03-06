const fs = require('fs');
const pkg = require('./package.json');

const dependencies = {
  ...pkg.dependencies,
  '@dytesdk/ui-kit': pkg.version,
};

const env = (process.env.ENVIRONMENT || 'staging').replace('refs/heads/', '');

const tag = env === 'main' ? 'latest' : env;

fs.writeFileSync(
  './package.json',
  JSON.stringify(
    {
      ...pkg,
      license: undefined,
      name: process.env.GHR === 'true' ? '@dyte-in/react-ui-kit' : '@dytesdk/react-ui-kit',
      dependencies,
      publishConfig:
        process.env.GHR === 'true' || !env.includes('main') ? { tag } : pkg.publishConfig,
      scripts: {
        postpublish: pkg.scripts.postpublish,
      },
    },
    null,
    2
  )
);
